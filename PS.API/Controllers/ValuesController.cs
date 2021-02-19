using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using PS.API.Data;

namespace PS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext context;

        public ValuesController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetValues(){
            var values = this.context.Values.ToList();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public IActionResult GetValue(int id){
            var value = this.context.Values.FirstOrDefault(v => v.Id == id);
            return Ok(value);
        }

    }
}