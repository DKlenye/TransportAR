﻿using System;

namespace Ext.Direct
{
    public class ParseAsJsonAttribute : Attribute
    {
        /// <summary>
        /// Creates a new instance of the object.
        /// </summary>
        public ParseAsJsonAttribute()
            : this(false)
        {
        }

        /// <summary>
        /// Creates a new instance of the object.
        /// </summary>
        /// <param name="asArray">True to parse the data as an array.</param>
        public ParseAsJsonAttribute(bool asArray)
        {
            AsArray = asArray;
        }

        /// <summary>
        /// Gets whether to parse the data as an array.
        /// </summary>
        public bool AsArray
        {
            get;
            private set;
        }
    }
}
