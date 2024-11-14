using Fluid;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/api/render", (RenderTemplatePayload pl) =>
{
	try
	{
		var parser = new FluidParser();
		if (!parser.TryParse(pl.Template, out var template, out var error))
		{
			return Results.Json(
				new ErrorDetails("Error parsing the provided template", error),
				statusCode: StatusCodes.Status422UnprocessableEntity
			);
		}
		var jsonContext = JsonNormalizer.Normalize(pl.Context);
		var context = new TemplateContext(jsonContext);
		var result = template.Render(context);

		return Results.Json(new { Data = result });
	}
	catch (Exception ex)
	{
		return Results.Json(
			new ErrorDetails("Unexpected error occured", ex.Message),
			statusCode: StatusCodes.Status500InternalServerError
		);
	}
});

app.Run();

record ErrorDetails(string error, string details) { }