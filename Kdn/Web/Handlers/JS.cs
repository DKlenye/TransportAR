﻿using System;
using System.Reflection;
using System.Collections.Generic;
using System.Web;
using Kdn.Ext;
using Kdn.Ext.data;

namespace Kdn.Web.Handlers
{
    public class JS : IHttpHandler
    {
        public virtual void ProcessRequest(HttpContext context)
        {
            ScriptReader.assembly = Assembly.GetExecutingAssembly();

            var BasePath = "Kdn.JS";

            Func<string, string> getPath = delegate(string path){return String.Format("{0}.{1}", BasePath, path);};

            
            context.Response.Write(ScriptReader.GetScript(
                getPath("Ext.adapter.ext.ext-base-debug.js"),
                getPath("Ext.ext-all.js")
            ));

            context.Response.Write(ScriptReader.GetScripts("Kdn.JS.Ext.ux",false));

            
            context.Response.Write(ScriptReader.GetScript(
                getPath("ExtNet.Net.js"),
                getPath("ExtNet.Net1.js")

            ));

            context.Response.Write(ScriptReader.GetScripts(String.Format("{0}.{1}", BasePath, "Kdn")));
           
            try
            {
                context.Response.Write(String.Format("Kdn.User = {0};", GetUser()));
            }catch(Exception ex)
            {
               context.Response.Write(String.Format("Kdn.User = '{0}';", ex.Message));
            }
                       
        }

        public virtual List<Model> getModels(){        
          return ModelConverter.ConvertAssembly(Assembly.GetExecutingAssembly());
        }
              
        
        public virtual string GetUser()
        {
            return "{}";
        }


        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
