using System;
using System.Collections.Generic;

namespace TodoAppAPI.Models
{
    public partial class Task
    {
        public int TaskId { get; set; }
        public string TaskHeader { get; set; } = null!;
        public string TaskDescription { get; set; } = null!;
        public DateTime? TaskDeadline { get; set; }
        public bool TaskDone { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category? Category { get; set; }
    }
}
