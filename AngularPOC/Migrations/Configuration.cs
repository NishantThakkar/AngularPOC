namespace AngularPOC.Migrations
{
    using AngularPOC.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<AngularPOC.Models.AngularPOCContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(AngularPOC.Models.AngularPOCContext context)
        {
            var r = new Random();
            var items = Enumerable.Range(1, 50).Select(o => new Todo() {
             DueDate = new DateTime(2012 , r.Next(1,12) , r.Next(1,28)),
             Priority = r.Next(10),
             Text = o.ToString()
            }).ToArray();
            context.Todoes.AddOrUpdate(i => new { i.Text }, items);
        }
    }
}
