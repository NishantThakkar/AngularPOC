namespace AngularPOC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Todoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                        DueDate = c.DateTime(),
                        Priority = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            AlterColumn("dbo.Todoes", "Todo", c => c.String(maxLength: 800));

            foreach (string col in new[] { "Todo", "Priority", "DueDate" })
                CreateIndex("Todoes", col);

        }

        public override void Down()
        {
            DropTable("dbo.Todoes");
        }
    }
}
