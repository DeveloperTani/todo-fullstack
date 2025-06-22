namespace ToDoMobile.Models
{
    public class TaskItem
    {
        public int TaskId { get; set; }
        public string TaskHeader { get; set; }
        public string TaskDescription { get; set; }
        public DateTime? TaskDeadline { get; set; }
        public bool TaskDone { get; set; }
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }  
    }
}