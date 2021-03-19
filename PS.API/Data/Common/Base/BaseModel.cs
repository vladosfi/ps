using System;
using System.ComponentModel.DataAnnotations;
using PS.API.Data.Common.Interfaces;

namespace PS.API.Data.Common.Base
{
    public abstract class BaseModel<TKey> : IAuditInfo
    {
        [Key]
        public TKey Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}