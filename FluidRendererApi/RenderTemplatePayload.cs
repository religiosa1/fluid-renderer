using System.Text.Json.Nodes;

class RenderTemplatePayload
{
	public required string Template { get; set; }
	public JsonNode? Context { get; set; }
}
