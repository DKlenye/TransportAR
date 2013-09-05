
using System;
using System.Collections;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI.WebControls;
using System.Text;
using System.IO;
using System.Web.UI;
using System.Web.Script.Services;
using System.Xml;
using System.Text.RegularExpressions;

/// <summary>
/// Summary description for DataService
/// </summary>
/// 

namespace Kdn.Services
{

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
public class ServiceBase : System.Web.Services.WebService
{

    protected SqlConnection _connection;
    protected SqlDataAdapter _adapter;
    protected DataTable _table;
    protected XmlDocument _template;
    protected string[] _parameters;
    protected SqlCommand _command;


    public ServiceBase()
    {
        _template = new XmlDocument();
        SetConnection();
        this._command = this._connection.CreateCommand();
    }

     ~ServiceBase()
    {
        try
        {
            this._connection.Close();
            this._connection = null;
        }
        catch { ;}
    }
    protected void SetConnection()
    {
        _connection = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["tdbf"].ConnectionString);
    }
    protected void SetTemplate(string TemplateName, string TemplateFolder)
    {
        this._template.Load(Server.MapPath("~\\"+TemplateFolder+"\\" + TemplateName + ".xml"));
    }
    protected void SetParameters(string parameters, char splitter)
    {
        if (parameters.Length!=0)
        this._parameters = parameters.Substring(0, parameters.Length-1).Split(splitter);
    }

    protected bool FillTable(string select)
    {
        this._adapter = new SqlDataAdapter(ApplyParameters(select,"@"), _connection);
        _table = new DataTable("table");
        if (validateCommand(this._adapter.SelectCommand.CommandText,"@"))
        {
            _adapter.Fill(_table);
            return true;
        }
        return false;
    }
    protected string ApplyParameters(string Template, string ParameterPrefix)
    {
        string rezult = Template.ToLower();

        try
        {
            for (int i = 0; i < this._parameters.Length; i++)
            {
                string[] str = this._parameters[i].Split('$');
                rezult = rezult.Replace(ParameterPrefix + str[0].ToLower(), str[1]);
            }
        }
        catch (Exception ex){ ;}
        
        return rezult;
    }

    protected bool validateCommand(string command, string prefix)
        {
            Regex r = new Regex(""+prefix+"\\w*");
            return !r.IsMatch(command);
        }

}
}