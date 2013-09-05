using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Castle.ActiveRecord;

[assembly: MappingAttribute]

[AttributeUsage(AttributeTargets.Assembly, AllowMultiple = false), Serializable]
public class MappingAttribute : RawXmlMappingAttribute
{
   public override string[] GetMappings()
   {
      var assembly = Assembly.GetExecutingAssembly();
      var resources = assembly.GetManifestResourceNames();

      var mappings = new List<string>();

      foreach (var resourceName in resources)
      { 
         if (resourceName.EndsWith("hbm.xml") && resourceName.StartsWith("Transport.Models"))
         {
            var stream = assembly.GetManifestResourceStream(resourceName);
            var reader = new StreamReader(stream);
            mappings.Add(reader.ReadToEnd());
         }
      }

      return mappings.ToArray();


   }
}