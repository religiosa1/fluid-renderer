class RenderTemplatePayload
{
	public required string Template { get; set; }
	public Dictionary<string, object> Context { get; set; } = new();
}
