using System.Text.Json.Nodes;

/// <summary>
/// Convert JSON arrays into native Lists, and Objects into native Dicts,
/// so Fluid renderer can understand the context.
/// </summary>
public static class JsonNormalizer
{
	public static object? Normalize(object? node) => node switch
	{
		JsonObject jsonObject => ConvertJsonNodeToDictionary(jsonObject),
		JsonArray jsonArray => jsonArray.Select(Normalize).ToList(),
		JsonValue jsonValue => jsonValue.GetValueKind() switch
		{
			System.Text.Json.JsonValueKind.String => jsonValue.ToString(),
			System.Text.Json.JsonValueKind.True => true,
			System.Text.Json.JsonValueKind.False => false,
			System.Text.Json.JsonValueKind.Null => null,
			System.Text.Json.JsonValueKind.Undefined => null,
			_ => jsonValue,
		},
		_ => null
	};

	private static Dictionary<string, object?> ConvertJsonNodeToDictionary(JsonNode jsonNode)
	{
		var dictionary = new Dictionary<string, object?>();
		foreach (var (key, node) in jsonNode.AsObject())
		{
			dictionary[key] = Normalize(node);
		}
		return dictionary;
	}
}