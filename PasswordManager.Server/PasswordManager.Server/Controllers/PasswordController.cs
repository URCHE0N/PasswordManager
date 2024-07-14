using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasswordManager.Server.Contracts;
using PasswordManager.Server.DataAccess;
using PasswordManager.Server.Models;

namespace PasswordManager.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PasswordController : ControllerBase
    {
        private readonly PasswordsDbContext _dbContext;

        public PasswordController(PasswordsDbContext DbContext)
        {
            _dbContext = DbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUpdatePasswordRequest request, CancellationToken cancellationToken)
        {
            var password = new Password(request.Name, request.TextPassword);
            await _dbContext.Passwords.AddAsync(password, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetPasswordsRequest request, CancellationToken cancellationToken)
        {
            var passwordsQuery = _dbContext.Passwords.Where(p => string.IsNullOrEmpty(request.Search) || p.Name.ToLower().Contains(request.Search.ToLower()));
            passwordsQuery = passwordsQuery.OrderByDescending(p => p.DateAdd);
            var passwordDtos = await passwordsQuery.ToListAsync(cancellationToken);
            return Ok(passwordDtos);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateUpdatePasswordRequest request, CancellationToken cancellationToken)
        {
            return Ok(await _dbContext.Passwords.Where(p => p.Id == id).ExecuteUpdateAsync(s => s.SetProperty(u => u.Name, u => request.Name)
            .SetProperty(u => u.TextPassword, u => request.TextPassword), cancellationToken));
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            return Ok(await _dbContext.Passwords.Where(p => p.Id == id).ExecuteDeleteAsync(cancellationToken));
        }
    }
}
