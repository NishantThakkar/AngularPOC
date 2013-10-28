namespace AngularPOC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class N2 : DbMigration
    {
        public override void Up()
        {
            foreach (string col in new[] { "Text", "Priority", "DueDate" })
                CreateIndex("Todoes", col);
        }
        
        public override void Down()
        {
        }
    }
}
