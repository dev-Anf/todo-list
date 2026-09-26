namespace backend.Models;

public class TodoItem
{
    public int Id { get; set; }
    public required string Text { get; set; }
    public bool IsDone { get; set; }
}