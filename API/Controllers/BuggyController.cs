using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("unauthorized")]
        //[Authorize]
        public IActionResult GetSecretText()
        {
            return Unauthorized(new ApiErrorResponse(401));
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = _context.Products.Find(42);

            if (thing == null) 
            {
                return NotFound(new ApiErrorResponse(404));
            }

            return Ok();
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a test 500 internal server error");
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiErrorResponse(400));
        }

        [HttpPost("validationerror")]
        public IActionResult ValidationError()
        {
            return BadRequest(new
            {
                title = "Validation Error",
                message = "Some Validation Errors May have Ocurred",
                
            });
        }

    }
}