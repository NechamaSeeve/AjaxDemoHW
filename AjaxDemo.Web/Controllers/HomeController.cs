using AjaxDemo.Data;
using AjaxDemo.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AjaxDemo.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=10.211.55.2; Initial Catalog=People;User Id=sa;Password=Foobar1@;TrustServerCertificate=true;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
           
            var repo = new PeopleRepo(_connectionString);
            return Json(repo.GetAll());
        }

        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Add(person);
        }
        [HttpPost]
        public void UpdatePerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Update(person);
        }
        [HttpPost]
        public void Delete(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Delete(id);
        }
    }
}
