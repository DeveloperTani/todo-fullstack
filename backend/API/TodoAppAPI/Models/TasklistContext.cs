using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TodoAppAPI.Models
{
    public partial class TasklistContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public TasklistContext()
        {
        }

        public TasklistContext(DbContextOptions<TasklistContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Task> Tasks { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var config = new ConfigurationBuilder()
                    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                    .AddJsonFile("appsettings.json")
                    .Build();

                var connectionString = config.GetConnectionString("TasklistDatabase");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
                entity.Property(e => e.CategoryName)
                      .HasMaxLength(255)
                      .IsUnicode(false);
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.Property(e => e.TaskId).HasColumnName("TaskID");
                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
                entity.Property(e => e.TaskDeadline).HasColumnType("date");
                entity.Property(e => e.TaskDescription).HasColumnType("text");
                entity.Property(e => e.TaskHeader)
                      .HasMaxLength(255)
                      .IsUnicode(false);

                entity.HasOne(d => d.Category)
                      .WithMany(p => p.Tasks)
                      .HasForeignKey(d => d.CategoryId)
                      .HasConstraintName("FK_Tasks_Categories");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}