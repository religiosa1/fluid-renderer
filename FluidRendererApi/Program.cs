using Fluid;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/api/render", (RenderTemplatePayload pl) =>
{
	var parser = new FluidParser();
	var template = parser.Parse(pl.Template);
	var context = new TemplateContext(pl.Context);
	var result = template.Render(context);
	return Results.Json(new { Data = result });
});

app.Run();
