namespace AngularPOC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class N1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Todoes", "Text", c => c.String(maxLength: 800));

            foreach (string col in new[] { "Todo", "Priority", "DueDate" })
                CreateIndex("Todoes", col);
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Todoes", "Text", c => c.String());
        }
    }
}
