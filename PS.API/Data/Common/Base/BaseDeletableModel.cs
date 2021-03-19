using System;
using PS.API.Data.Common.Interfaces;

namespace PS.API.Data.Common.Base
{
    public abstract class BaseDeletableModel<TKey> : BaseModel<TKey>, IDeletableEntity
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}