using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAppAPI.Models;

namespace TodoAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TasklistContext _context;

        public TasksController(TasklistContext context)
        {
            _context = context;
        }

        // GET: api/Tasks/db-test
        [HttpGet("db-test")]
        public IActionResult TestDbConnection()
        {
            try
            {
                var testConnection = _context.Tasks.FirstOrDefault();
                return Ok("Database connection successful.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Database connection failed: {ex.Message}");
            }
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetTasks()
        {
            if (_context.Tasks == null)
                return NotFound("Tasks table not found.");

            try
            {
                var tasks = await _context.Tasks.ToListAsync();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message, stack = ex.StackTrace });
            }
        }

        // GET: api/Tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Task>> GetTask(int id)
        {
            if (_context.Tasks == null)
                return NotFound();

            var task = await _context.Tasks
                                     .Include(t => t.Category)
                                     .FirstOrDefaultAsync(t => t.TaskId == id);

            if (task == null)
                return NotFound();

            return task;
        }

        // GET: api/Tasks/ByCategory/{categoryId}
        [HttpGet("ByCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetTaskByCategory(int categoryId)
        {
            var tasks = await _context.Tasks
                                      .Where(t => t.CategoryId == categoryId)
                                      .ToListAsync();

            if (tasks == null || tasks.Count == 0)
                return NotFound();

            return tasks;
        }

        // PUT: api/Tasks/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, Models.Task task)
        {
            if (id != task.TaskId)
                return BadRequest();

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<Models.Task>> PostTask(Models.Task task)
        {
            if (_context.Tasks == null)
                return Problem("Entity set 'TasklistContext.Tasks' is null.");

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.TaskId }, task);
        }

        // DELETE: api/Tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            if (_context.Tasks == null)
                return NotFound();

            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks?.Any(e => e.TaskId == id) ?? false;
        }
    }
}
