using System;
using System.Collections.Generic;

namespace TodoAppAPI.Models
{
    public partial class Category
    {
        public Category()
        {
            Tasks = new HashSet<Task>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = null!;

        public virtual ICollection<Task> Tasks { get; set; }
    }
}
