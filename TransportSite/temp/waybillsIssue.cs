using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Xml;
using System.Xml.Xsl;

public struct TextBoxItem {
  public TextBox  textBox;
  public string fieldName;
  
  public TextBoxItem(TextBox ATextBox, string AFieldName) {
    this.textBox   = ATextBox;
    this.fieldName = AFieldName;
  }
}
public class waybillsIssue : System.Web.UI.Page  {
#region объявления элементов управления на форме

	protected string				_driverPrefix = "[_] . . . ";
  protected string[]			_month = new string[] {"...", "январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь" };
  protected bool					_moreThan1;

  protected SqlConnection       _connection;
  protected SqlDataAdapter		_adapter;

  protected System.Web.UI.WebControls.Xml     xmlWaybill;
    protected System.Web.UI.WebControls.Label LimitMessage;
  protected System.Web.UI.WebControls.Label   message;
  protected System.Web.UI.WebControls.Label   printMessage;
  
  protected System.Web.UI.WebControls.TextBox   activeField; // 
  
  protected System.Web.UI.WebControls.TextBox   garageNumber;
  protected System.Web.UI.WebControls.TextBox   model;
  protected System.Web.UI.WebControls.TextBox   registrationNumber;
  protected System.Web.UI.WebControls.TextBox   licenceCartNo;
    
  protected System.Web.UI.WebControls.TextBox   formNumber;
  protected System.Web.UI.WebControls.TextBox   waybillNumber;

  protected System.Web.UI.WebControls.TextBox   departureDate;
  protected System.Web.UI.WebControls.TextBox   departureTime;
  protected System.Web.UI.WebControls.TextBox   departureKm;
  protected System.Web.UI.WebControls.TextBox   departureMh;
  protected System.Web.UI.WebControls.ListBox   fuelRemains;

  protected System.Web.UI.WebControls.TextBox   shift;
  protected System.Web.UI.WebControls.TextBox   shiftBegin;
  protected System.Web.UI.WebControls.TextBox   shiftDuration;
  protected System.Web.UI.WebControls.TextBox shiftB_H;
  protected System.Web.UI.WebControls.TextBox shiftD_H;
  protected System.Web.UI.WebControls.TextBox shiftB_M;
  protected System.Web.UI.WebControls.TextBox shiftD_M;
    
  protected System.Web.UI.WebControls.ListBox   schedulesList;
  protected System.Web.UI.WebControls.TextBox   daysCount;
  protected System.Web.UI.WebControls.TextBox   returnDate;
  protected System.Web.UI.WebControls.TextBox   returnTime;

  protected System.Web.UI.WebControls.ListBox   driversList;

  protected System.Web.UI.WebControls.Button    openFormButton;

  protected System.Web.UI.WebControls.Button    buttonChooseDrivers; 
  protected System.Web.UI.WebControls.Button    buttonClearDrivers; 
  protected System.Web.UI.WebControls.Button    buttonExcludeDriver; 
  protected System.Web.UI.WebControls.Button    buttonIncludeDriver; 
  protected System.Web.UI.WebControls.TextBox   newDriverId;
  protected System.Web.UI.WebControls.TextBox   newDriverString;

  protected System.Web.UI.WebControls.TextBox   customerId;
  protected System.Web.UI.WebControls.TextBox   customerName;
  
  protected System.Web.UI.WebControls.TextBox   trailerGarageNumber;
  protected System.Web.UI.WebControls.TextBox   trailerModel;
  protected System.Web.UI.WebControls.TextBox   trailerRegistrationNumber;

  protected System.Web.UI.WebControls.TextBox PrinterName;
  protected System.Web.UI.WebControls.TextBox _top;
  protected System.Web.UI.WebControls.TextBox _left;
  protected System.Web.UI.WebControls.TextBox _offsetWidth;
  protected System.Web.UI.WebControls.TextBox _offsetLength;

  protected System.Web.UI.WebControls.TextBox   way;
  
  protected System.Web.UI.WebControls.LinkButton	buttonIssue;
  protected System.Web.UI.WebControls.ListBox		waybillTypesList;
  
  protected System.Web.UI.WebControls.Button	buttonPrintWaybill;

#endregion

    #region Web Form Designer generated code
    override protected void OnInit(EventArgs e)
    {
      //
      // CODEGEN: This call is required by the ASP.NET Web Form Designer.
      //
      InitializeComponent();
      base.OnInit(e);
    }

    /// <summary>
    /// Required method for Designer support - do not modify
    /// the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
		this.Load += new System.EventHandler(this.Page_Load);

		this.openFormButton.Click += new System.EventHandler(this.fillForm);
		this.buttonIssue.Click += new System.EventHandler(this.buttonIssueClick);
    
		this.buttonExcludeDriver.Click += new System.EventHandler(this.excludeDriver);
		this.buttonIncludeDriver.Click += new System.EventHandler(this.includeDriver);
		this.buttonClearDrivers.Click += new System.EventHandler(this.clearDrivers);
		this.buttonChooseDrivers.Click += new System.EventHandler(this.chooseDrivers);
		this.buttonPrintWaybill.Click += new System.EventHandler(this.printWaybill);

    }
    #endregion

    private void Page_Load(object sender, System.EventArgs e)
    {
    //
		if (!IsPostBack || this.departureDate.Text.Length==0) {
			DateTime dt = System.DateTime.Now;
			this.departureDate.Text = dt.ToString("dd.MM.yyyy");
		}
    }
    
    
#region методы предоставляющие SQL запросы
    //
    //
    //
  protected string sqlDriversList() {
		return "SELECT driverId, '"+this._driverPrefix+"'+string+(CASE WHEN drivingLicenceNumber IS NULL OR drivingLicenceNumber=' ' THEN '' ELSE ' No:' END)+isnull(serial,'')+' '+isNull(drivingLicenceNumber,'') string FROM drivers d WHERE EXISTS(SELECT * FROM driversToTransport t WHERE t.ownerId=dbo.getCurrentOwner() and d.driverId=t.driverId AND t.garageNumber = "+this.garageNumber.Text+") AND d.data_uv IS NULL";
    }
    //
    protected string sqlCustomer() {
		return "SELECT * FROM customers WHERE isnull(hide,0)=0 and customerId = (SELECT customerId FROM transportFacilities WHERE garageNumber= "+this.garageNumber.Text+" and ownerId = dbo.getCurrentOwner())";
    }
    //
    protected string sqlFacility() {
        return "SELECT f.*, l.licenceCatrNo licenceCartNo FROM transportFacilities f LEFT JOIN licenceCarts l ON l.garageNumber=f.garageNumber and l.ownerId = f.ownerId AND CONVERT(datetime,'" + this.departureDate.Text + "',104) BETWEEN l.dateBegin AND l.dateEnd  WHERE f.garageNumber= " + this.garageNumber.Text + "and f.ownerId=(select dbo.getcurrentowner())"; //and f.ownerId=(select dbo.getcurrentowner())
    }
    //
    protected string sqlSchedulesList() {
		return "SELECT scheduleId, scheduleName FROM schedule ORDER BY scheduleName";
    }
    //
    protected string sqlWaybillTypesList() {
		return "SELECT * FROM waybillType ORDER BY waybillTypeId DESC";
    }
    //
    protected string sqlPrevWaybill() {
		return "execute WaybillIssue_Km "+this.garageNumber.Text+",'"+this.departureDate.Text+"'";
    }
    //
    protected string sqlRemains() {
		return "execute WaybillIssue_Remain "+this.garageNumber.Text+",'"+this.departureDate.Text+"'";
	}
    //
    protected string sqlTrailer() {
		return "SELECT * FROM transportTrailers WHERE trailerGarageNumber = (SELECT trailerGarageNumber FROM transportFacilities WHERE garageNumber = "+this.garageNumber.Text+" and ownerId = dbo.getCurrentOwner())";
    }
    //
    protected string sqlWaybill(long waybillNumber) {
		return "SELECT * FROM waybills WHERE ownerId = dbo.getCurrentOwner() and garageNumber = "+this.garageNumber.Text+" AND waybillNumber = "+waybillNumber.ToString();
    }
    //
    protected string sqlMinWaybillDate() {
		return "SELECT * FROM waybills WHERE departureDate > convert(datetime,'"+this.departureDate.Text+"',104) AND ownerId = dbo.getCurrentOwner() and garageNumber = "+this.garageNumber.Text+" AND waybillState = 2";
    }
	
		 protected string sqlLimitCheck() {
		return "execute FuelLimitCheck "+this.garageNumber.Text+" ,'" +this.departureDate.Text+"'";
    }

    protected string PrinterSettings(string PrinterName)
    {
        return "if not exists (Select * from Printers where PrinterName='" + PrinterName + "') select * from printers where PrinterName='default' else Select * from Printers where PrinterName='" + PrinterName + "'";
    }
    protected string GetOffset(string WaybillType)
    {
        return "select isnull(offsetWidth,0)offsetWidth,isnull(offsetLength,0) offsetLength from waybilltype where waybilltypeid=" + WaybillType;
    }

    
#endregion
  
    //
    //
    //
    protected DataTable fillTextBoxes(string ASQL, TextBoxItem[] AItems) {
		this._adapter.SelectCommand.CommandText = ASQL;
		DataTable dataTable = new DataTable();
		int i=0;
		try {
			this._adapter.Fill(dataTable);
			while(i < AItems.Length) {
				AItems[i].textBox.Text = dataTable.Rows[0][AItems[i].fieldName].ToString();
				i++;
			}
		}
		catch(Exception ex) { 
			 //Response.Write(ex.Message+" / ");
			while(i < AItems.Length) {
				AItems[i].textBox.Text = "";
				i++;
			}
		}
		return dataTable;
    }
    
    //
    //
    //
    protected int getNewWaybillNumber() {

		int waybillNumber;
		    
		DataTable dataTable;
		TextBoxItem[] tb = new TextBoxItem[] { };

		this._moreThan1 = false;

		// поправка на год 95-0 96-12 97-24 98-36
		string [] datePart = this.departureDate.Text.Split('.');
		if (datePart.Length < 3) {
			this.message.CssClass = "warning";
			this.message.Text = "Неверный формат даты";
			return -1;
		}
  
		dataTable = fillTextBoxes(sqlMinWaybillDate(), tb);
		if (dataTable.Rows.Count > 0) {
			this.message.CssClass = "message";
			this.message.Text = "Нельзя выдать путевой лист на дату "+this.departureDate.Text+". Есть более поздний закрытый путевой лист.";
			this.activeField.Text = "garageNumber";
			return -1;
		}
    
	
	SqlCommand LimCom = new SqlCommand(sqlLimitCheck(), this._connection);
		this._connection.Open();
		string lim = "";
		lim = (string)LimCom.ExecuteScalar();
		this._connection.Close();
		
		if (lim.Length!=0){	
			try{
			this.LimitMessage.Text += " "+lim+"!  ";
			this.LimitMessage.CssClass = "Limmessage";
				}
				catch (Exception ex){} 
		}

		// 0 dd
		// 1 mm
		// 2 yyyy
		int dd = System.Convert.ToInt32(datePart[0]) , mm = System.Convert.ToInt32(datePart[1]), yyyy = System.Convert.ToInt32(datePart[2]);
		waybillNumber = ( (yyyy - 1995) * 12 * 10000000 ) + ( (mm * 10000000) + (dd * 100000) ) + (System.Convert.ToInt32(this.garageNumber.Text) * 10);
		try {
			for (int ind=0; ind < 10; ind++) {
				dataTable = fillTextBoxes(sqlWaybill(waybillNumber), tb);
				if (dataTable.Rows.Count == 0) {
					if (this._moreThan1) {
						this.message.Text += "на текущую дату пут.лист уже выдавался";
						this.message.CssClass = "warning";
					}
					return waybillNumber;
				}
				waybillNumber++;
				this._moreThan1 = true;
			}
      
			this.activeField.Text = "garageNumber";
			this.message.CssClass = "warning";
			this.message.Text = "На один день нельзя выдать более 10-ти путевых листов";
			return -1;
      
		}
		catch (Exception ex) {
			this.activeField.Text = "garageNumber";
			this.message.CssClass = "message";
			this.message.Text = "ОШИБКА :"+ex.Message;
			return -1;
		}
    }
    
    //
    // очистить елементы
    //
    private void clearElements() {
    
		this.driversList.Items.Clear();
		this.fuelRemains.Items.Clear();
		this.schedulesList.Items.Clear();
		this.waybillTypesList.Items.Clear();
		
		//this.garageNumber.Text = "";
		this.model.Text = "";
		this.registrationNumber.Text = "";
		this.licenceCartNo.Text = "";
    
		//	this.formNumber.Text = "";
		this.waybillNumber.Text = "";

		this.departureTime.Text = "";
		this.departureKm.Text = "";
		this.departureMh.Text = "";
		this.shift.Text = "1";
		this.shiftBegin.Text = "";
		this.shiftDuration.Text = "";
    
		this.daysCount.Text = "1";
		this.returnDate.Text = this.departureDate.Text;
		this.returnTime.Text = "";

		this.customerId.Text = "";
		this.customerName.Text = "";
  
		this.trailerGarageNumber.Text = "";
		this.trailerModel.Text = "";
		this.trailerRegistrationNumber.Text = "";

		this.way.Text = "";
	}
    
	//
	//
	//
	private void fillForm(object sender, System.EventArgs e) 
	{
		this._connection = new SqlConnection(System.Configuration.ConfigurationSettings.AppSettings["connectionString"]);
		this._adapter    = new SqlDataAdapter("", this._connection);
    
		/*
		очистить списки
		*/
		clearElements();
		
		/* 
	    заполнить форму
	    */
	    DataTable   dataTable;
    
		// автомобиль
	    dataTable = fillTextBoxes(sqlFacility(), new TextBoxItem[] { 
																		new TextBoxItem(this.model, "model"), 
																		new TextBoxItem(this.registrationNumber, "registrationNumber"), 
																		new TextBoxItem(this.licenceCartNo, "licenceCartNo"), 
																		new TextBoxItem(this.shiftBegin, "shiftBegin"), 
																		new TextBoxItem(this.shiftDuration, "shiftDuration") } );
		if (dataTable.Rows.Count > 0) {
			string schedule		= dataTable.Rows[0]["scheduleId"].ToString();
			string waybillType	= dataTable.Rows[0]["waybillTypeId"].ToString();

			
			try{
		  this.shiftB_H.Text = this.shiftBegin.Text.Split('.')[0];
			if (this.shiftBegin.Text.Split('.').Length>1)
            this.shiftB_M.Text = this.shiftBegin.Text.Split('.')[1];          
            this.shiftD_H.Text = (int.Parse(this.shiftB_H.Text)+ int.Parse(this.shiftDuration.Text)).ToString(); 
			}
		  catch (Exception){;}
           
         
    
			// показания выезда
			fillTextBoxes(sqlPrevWaybill(), new TextBoxItem[] { new TextBoxItem(this.departureKm, "returnKm"), new TextBoxItem(this.departureMh, "returnMh") } );
    
			// остатки
			this._adapter.SelectCommand.CommandText = sqlRemains();
			dataTable = new DataTable();
			this._adapter.Fill(dataTable);
			this.fuelRemains.DataTextField    = "fuelString";
			this.fuelRemains.DataValueField   = "fuelId";
			this.fuelRemains.DataSource    = dataTable;
			this.fuelRemains.DataBind();
    
			// список водителей
			this._adapter.SelectCommand.CommandText = sqlDriversList();
			dataTable = new DataTable();
			this._adapter.Fill(dataTable);
			this.driversList.DataTextField    = "string";
			this.driversList.DataValueField   = "driverId";
			this.driversList.DataSource    = dataTable;
			this.driversList.DataBind();
      /*
			if (this.driversList.Items.Count > 0) {
				this.driversList.Items[0].Selected = true;
			}
      */
    
			// график
			this._adapter.SelectCommand.CommandText = sqlSchedulesList();
			dataTable = new DataTable();
			this._adapter.Fill(dataTable);
			this.schedulesList.DataTextField    = "scheduleName";
			this.schedulesList.DataValueField   = "scheduleId";
			this.schedulesList.DataSource    = dataTable;
			this.schedulesList.DataBind();
			try {
				this.schedulesList.Items.FindByValue(schedule).Selected = true;
			}
			catch(Exception) {
				;
			}
    
			// бланк пут.листа
			this._adapter.SelectCommand.CommandText = sqlWaybillTypesList();
			dataTable = new DataTable();
			this._adapter.Fill(dataTable);
			this.waybillTypesList.DataTextField    = "waybillTypeName";
			this.waybillTypesList.DataValueField   = "waybillTypeId";
			this.waybillTypesList.DataSource    = dataTable;
			this.waybillTypesList.DataBind();
			try {
				this.waybillTypesList.Items.FindByValue(waybillType).Selected = true;
			}
			catch(Exception) {
				;
			}

			// заказчик
			fillTextBoxes(sqlCustomer(), new TextBoxItem[] { new TextBoxItem(this.customerId, "customerId"), new TextBoxItem(this.customerName, "customerName") } );
    
			// прицеп
			fillTextBoxes(sqlTrailer(), new TextBoxItem[] { new TextBoxItem(this.trailerGarageNumber, "trailerGarageNumber"), new TextBoxItem(this.trailerModel, "model"), new TextBoxItem(this.trailerRegistrationNumber, "registrationNumber") } );
    
			// дата возвращения
    
			// номер пут.листа !!!!
			int waybillNumber = getNewWaybillNumber();
			if (waybillNumber < 0)
				this.waybillNumber.Text = "";
			else 
				this.waybillNumber.Text = waybillNumber.ToString();

			try{	
				
            if (this.waybillTypesList.SelectedItem.Value == "23")
            {
                this.formNumber.Text = waybillNumber.ToString();
            }
			}
			catch(Exception ex){
			
			}


        // остатки - если не первый на тек. день, то остатки обнулить
        if (this._moreThan1) {
        	this.departureKm.Text = "";
					this.departureMh.Text = "";
					for (int i=0; i<this.fuelRemains.Items.Count; i++) {
						this.fuelRemains.Items[i].Text = this.fuelRemains.Items[i].Text.Substring(0, this.fuelRemains.Items[i].Text.IndexOf(":")+1);
					}
        }
		}
		else {
			this.message.CssClass = "warning";
			this.message.Text = "Нет данных по гаражному номеру";
			this.activeField.Text = "garageNumber";
			this.waybillNumber.Text = "";
		}
		this._connection.Close();
  }
  
	
	//
	//	выдача путевого листа
	//
	private void buttonIssueClick(object sender, System.EventArgs e) {
       
		try {
		
							
            if (this.waybillTypesList.SelectedItem.Value == "23")
            {
                
				if (System.Convert.ToInt32(this.waybillNumber.Text) > 0){
				
				
					this.formNumber.Text="0";
				
				// занести в базу ...
					putWaybill();
									
									
					
					//загружаем настройки принтера

					this._connection = new SqlConnection(System.Configuration.ConfigurationSettings.AppSettings["connectionString"]);
					this._adapter = new SqlDataAdapter("", this._connection);

					fillTextBoxes(PrinterSettings(this.PrinterName.Text), new TextBoxItem[] { new TextBoxItem(this._top, "_top"), new TextBoxItem(this._left, "_left") });

					fillTextBoxes(GetOffset(this.waybillTypesList.SelectedItem.Value), new TextBoxItem[] { new TextBoxItem(this._offsetWidth, "offsetWidth"), new TextBoxItem(this._offsetLength, "offsetLength") });

					
					SqlCommand command = new SqlCommand("Select WaybillId from waybills where ownerId = dbo.getCurrentOwner() and waybillNumber="+this.waybillNumber.Text, this._connection);
					
					this._connection.Open();
					int WaybillId = (int)command.ExecuteScalar();
					this._connection.Close();
					
					this.formNumber.Text = WaybillId.ToString();

					// печать пут.листа ...
					createPrintingXml();					
					
					// инициализация элементов
					this.message.Text ="ВЫДАН пут.лист No:<span class='messageNumber'>"+this.waybillNumber.Text+"</span> бланк No:<span class='messageNumber'>"+WaybillId.ToString()+"</span><span style='font-size: smaller;'>("+this.waybillTypesList.SelectedItem.Value+")</span>";
					
					// очистить все поля ...
					clearElements();
				   
					// установить флаг печати
					this.message.Text += "<script language=\"JavaScript\">PrintEnabled = true;</script>"; // ?!?!?!?
				
				}
				else {
					this.message.CssClass = "message";
					this.message.Text = "ПУТЕВОЙ ЛИСТ НЕ МОЖЕТ БЫТЬ ВЫДАН";
				}	
				
				
				
						
			
			
			}
			else {
			
				if (System.Convert.ToInt32(this.waybillNumber.Text) > 0 && System.Convert.ToInt32(this.formNumber.Text) > 0) {
					// занести в базу ...
					putWaybill();
									
					// инициализация элементов
					this.message.Text ="ВЫДАН пут.лист No:<span class='messageNumber'>"+this.waybillNumber.Text+"</span> бланк No:<span class='messageNumber'>"+this.formNumber.Text+"</span><span style='font-size: smaller;'>("+this.waybillTypesList.SelectedItem.Value+")</span>";
				
					// печать пут.листа ...
					createPrintingXml();


					//загружаем настройки принтера

					this._connection = new SqlConnection(System.Configuration.ConfigurationSettings.AppSettings["connectionString"]);
					this._adapter = new SqlDataAdapter("", this._connection);

					fillTextBoxes(PrinterSettings(this.PrinterName.Text), new TextBoxItem[] { new TextBoxItem(this._top, "_top"), new TextBoxItem(this._left, "_left") });

					fillTextBoxes(GetOffset(this.waybillTypesList.SelectedItem.Value), new TextBoxItem[] { new TextBoxItem(this._offsetWidth, "offsetWidth"), new TextBoxItem(this._offsetLength, "offsetLength") });

					// очистить все поля ...
					clearElements();
					// номер бланка
					try {
						int fnum = System.Convert.ToInt32(this.formNumber.Text);
						fnum++;
						this.formNumber.Text = fnum.ToString();
					}
					catch(Exception) {
						this.formNumber.Text = "";
					}
					
				   
					// установить флаг печати
					this.message.Text += "<script language=\"JavaScript\">PrintEnabled = true;</script>"; // ?!?!?!?
				}
				else {
					this.message.CssClass = "message";
					this.message.Text = "ПУТЕВОЙ ЛИСТ НЕ МОЖЕТ БЫТЬ ВЫДАН";
				}	
			
			
			}
							
		}
        catch (Exception ex)
        {
            
			this.message.CssClass = "message";
			if (this.waybillNumber.Text.Length==0) 
			{
                this.message.Text = "не заполнена форма для выдачи путевого листа";
			}
			else if (this.formNumber.Text.Length==0) {
				this.message.Text = "не заполнен номер бланка";
			}
			else if (this.waybillTypesList.SelectedItem==null){
				this.message.Text = "не выбрана форма путевого листа";
			}
			else {
				this.message.Text = "ПУТЕВОЙ ЛИСТ НЕ ВЫДАН.Ошибка:"+ ex.Message;
			}
		}
	}
	//
	// создание печатного XML
	// 
	private void createPrintingXml() {

		XmlDocument xml = new XmlDocument();
		XmlElement  xel, xel2, xel3;
		XmlAttribute xattr;
		int pos;
		string[] dateParts;
		
		xml.LoadXml("<waybill><type>"+this.waybillTypesList.SelectedItem.Value+"</type></waybill>");
		xel = xml.CreateElement("facility");
		try {
  			xel2 = xml.CreateElement("garageNumber"); xel2.InnerText = this.garageNumber.Text;
  			xel.AppendChild(xel2);
  			xel2 = xml.CreateElement("model"); xel2.InnerText = this.model.Text;
			xel.AppendChild(xel2);
			xel2 = xml.CreateElement("registrationNumber"); xel2.InnerText = this.registrationNumber.Text;
			xel.AppendChild(xel2);
  			xel2 = xml.CreateElement("licenceCart"); xel2.InnerText = this.licenceCartNo.Text;
  			xel.AppendChild(xel2);
  			xel2 = xml.CreateElement("waybillNumber");	xel2.InnerText = this.waybillNumber.Text;
  			xel.AppendChild(xel2);
  			xel2 = xml.CreateElement("formNumber"); xel2.InnerText = this.formNumber.Text;
  			xel.AppendChild(xel2);
  			xel2 = xml.CreateElement("schedule"); xel2.InnerText = this.schedulesList.SelectedItem!=null ? this.schedulesList.SelectedItem.Text : "";
			xel.AppendChild(xel2);
		}
		catch(Exception) {
			;
		}
		xml.DocumentElement.AppendChild(xel);
  		
  		xel = xml.CreateElement("departure");
  		try {
			xel2 = xml.CreateElement("date"); xel2.InnerText = this.departureDate.Text;
			xel.AppendChild(xel2);
			// дата в виде день месяц год
			dateParts = this.departureDate.Text.Split(new char[] {'.'});
			xel2 = xml.CreateElement("day") ; xel2.InnerText = dateParts[0];
			xel.AppendChild(xel2);
			xel2 = xml.CreateElement("month") ; xel2.InnerText = this._month[System.Convert.ToInt32(dateParts[1])];
			xel.AppendChild(xel2);
			xel2 = xml.CreateElement("year") ; xel2.InnerText = dateParts[2];
			xel.AppendChild(xel2);
			
			xel2 = xml.CreateElement("time"); xel2.InnerText = this.departureTime.Text;
			xel.AppendChild(xel2);
			xel2 = xml.CreateElement("km"); xel2.InnerText = this.departureKm.Text;
			xel.AppendChild(xel2);
			xel2 = xml.CreateElement("mh"); xel2.InnerText = this.departureMh.Text;
			xel.AppendChild(xel2);
			xel2 = xml.CreateElement("remains");
				for (int i=0; i<this.fuelRemains.Items.Count; i++) {
					xel3 = xml.CreateElement("fuel");
					pos = this.fuelRemains.Items[i].Text.IndexOf(":");
					xattr = xml.CreateAttribute("name"); xattr.Value = this.fuelRemains.Items[i].Text.Substring(0, pos);
					xel3.Attributes.Append(xattr);
					xattr = xml.CreateAttribute("value"); xattr.Value = this.fuelRemains.Items[i].Text.Substring(pos+1);
					xel3.Attributes.Append(xattr);
					xel2.AppendChild(xel3);
				}
				
			xel.AppendChild(xel2);
		}
		catch(Exception) {
			;
		}
		xml.DocumentElement.AppendChild(xel);
		
		xel = xml.CreateElement("return");
			xel2 = xml.CreateElement("date"); xel2.InnerText = this.returnDate.Text;
			xel.AppendChild(xel2);
			// дата в виде день месяц год
			dateParts = this.returnDate.Text.Split(new char[] {'.'});
			xel2 = xml.CreateElement("day") ; xel2.InnerText = dateParts[0];
			xel.AppendChild(xel2);
			xel2 = xml.CreateElement("month") ; xel2.InnerText = this._month[System.Convert.ToInt32(dateParts[1])];
			xel.AppendChild(xel2);
			xel2 = xml.CreateElement("year") ; xel2.InnerText = dateParts[2];
			xel.AppendChild(xel2);
			
			xel2 = xml.CreateElement("time"); xel2.InnerText = this.returnTime.Text;
			xel.AppendChild(xel2);
		xml.DocumentElement.AppendChild(xel);
		
		xel = xml.CreateElement("customer");
			xel2 = xml.CreateElement("id"); xel2.InnerText = this.customerId.Text;
			xel.AppendChild(xel2);
			xel2 = xml.CreateElement("name"); xel2.InnerText = this.customerName.Text;
			xel.AppendChild(xel2);
		xml.DocumentElement.AppendChild(xel);

		xel = xml.CreateElement("trailer");
			xel2 = xml.CreateElement("garageNumber"); xel2.InnerText = this.trailerGarageNumber.Text;
			xel.AppendChild(xel2);
			xel2 = xml.CreateElement("model"); xel2.InnerText = this.trailerModel.Text;
			xel.AppendChild(xel2);
			xel2 = xml.CreateElement("registrationNumber"); xel2.InnerText = this.trailerRegistrationNumber.Text;
			xel.AppendChild(xel2);
		xml.DocumentElement.AppendChild(xel);

		xel = xml.CreateElement("drivers");
		for (int i=0; i<this.driversList.Items.Count; i++) {
			xel2 = xml.CreateElement("driver");
			xattr = xml.CreateAttribute("zex"); xattr.Value = this.driversList.Items[i].Text.Substring(this._driverPrefix.Length,2);
			xel2.Attributes.Append(xattr);
			xattr = xml.CreateAttribute("tab"); xattr.Value = this.driversList.Items[i].Text.Substring(this._driverPrefix.Length+1+2,5);
			xel2.Attributes.Append(xattr);
			pos = this.driversList.Items[i].Text.IndexOf("No:");
			xattr = xml.CreateAttribute("licenceNumber");
			if (pos > 0)
				xattr.Value = this.driversList.Items[i].Text.Substring(pos+3, this.driversList.Items[i].Text.Length - pos -3);
			else
				xattr.Value = "";
			xel2.Attributes.Append(xattr);
			xattr = xml.CreateAttribute("fio");
			if (pos > 0)
				xattr.Value = this.driversList.Items[i].Text.Substring(this._driverPrefix.Length+9, pos-this._driverPrefix.Length-9);
			else
				xattr.Value = this.driversList.Items[i].Text.Substring(this._driverPrefix.Length+9);
			xel2.Attributes.Append(xattr);

			xel.AppendChild(xel2);
		}
		xml.DocumentElement.AppendChild(xel);
		
		xel = xml.CreateElement("way");
		xel.InnerText = this.way.Text;
		xml.DocumentElement.AppendChild(xel);
        //xml.Save(MapPath("xxx.xml"));
		this.xmlWaybill.DocumentContent = xml.OuterXml;
	
	
		// загружаем XSL выполняем transform
		XslTransform xsl = new XslTransform();
		try 
		{
			// пробуем загрузить файл
			xsl.Load(this.Request.MapPath(".\\waybillsIssue_"+this.waybillTypesList.SelectedItem.Value+".xsl"));
			this.printMessage.Text = this.waybillTypesList.SelectedItem.Text;
			this.printMessage.Visible = true;
		}
		catch(Exception) 
		{
			// загружаем файл по умолчанию 
			xsl.Load(this.Request.MapPath(".\\waybillsIssue.xsl"));
		}

		#region для демонстрации
		// xsl.Load(this.Request.MapPath(".\\waybillsIssue.xsl"));
		#endregion
				
		// выполняем transform
		this.xmlWaybill.Transform = xsl;
	}


#region методы для управления списком водителей	
  private void excludeDriver(object sender, System.EventArgs e) {
    this.driversList.Items.Remove(this.driversList.SelectedItem);
  }
  //
  private void chooseDrivers(object sender, System.EventArgs e) {
	bool cycle = true;
	while(cycle) {
		for (int i = 0; i < this.driversList.Items.Count && i>=0; i++) {
			if (this.driversList.Items[i].Selected || this.driversList.Items[i].Text.Substring(0,3)=="[x]") {
				;
			}
			else {
				this.driversList.Items.Remove(this.driversList.Items[i]);
				i = -1;
			}
		}
		cycle = false;
	}
  }
  //
  private void clearDrivers(object sender, System.EventArgs e) {
	this.driversList.Items.Clear();
  }
  //
  private void includeDriver(object sender, System.EventArgs e) { 
    if (this.newDriverId.Text.Length > 0 && this.newDriverString.Text.Length > 0) {
      this.driversList.Items.Add(new ListItem(this._driverPrefix + this.newDriverString.Text, this.newDriverId.Text));
    }
  }
#endregion
  
  //
  // печать пут.листа выданного раньше
  //
  private void printWaybill(object sender, System.EventArgs e) { 
	
	DataTable   dataTable;
	int resUpdt=0;
	
	// заполнить все поля из базы
	this._connection = new SqlConnection(System.Configuration.ConfigurationSettings.AppSettings["connectionString"]);
	this._adapter    = new SqlDataAdapter("", this._connection);

	
	fillTextBoxes(PrinterSettings(this.PrinterName.Text), new TextBoxItem[] { new TextBoxItem(this._top, "_top"), new TextBoxItem(this._left, "_left") });

    fillTextBoxes(GetOffset(this.waybillTypesList.SelectedItem.Value), new TextBoxItem[] { new TextBoxItem(this._offsetWidth, "offsetWidth"), new TextBoxItem(this._offsetLength, "offsetLength") });


	
	/*	очистить списки	*/
	// save values
	string saveDepartureDate = this.departureDate.Text;
	
	string grNum = this.garageNumber.Text;
	string wbNum = this.waybillNumber.Text;
	string fmNum = this.formNumber.Text;
	string wbType = this.waybillTypesList.SelectedItem.Value; // тип на форме
	// clear
	clearElements();
	// restore
	this.garageNumber.Text = grNum;
	this.waybillNumber.Text = wbNum;
	this.formNumber.Text = fmNum;

	/* 	заполнить форму	*/
    
	// автомобиль
	dataTable = fillTextBoxes(sqlFacility(), new TextBoxItem[] { 
																new TextBoxItem(this.model, "model"), 
																new TextBoxItem(this.registrationNumber, "registrationNumber")} );
	
	if (dataTable.Rows.Count > 0) {
		// изменить номер бланка и тпи путевого листа
		// . . . 
		this._connection.Open();
		SqlCommand command = new SqlCommand("UPDATE waybills SET waybillTypeId=0"+wbType+", formNumber=0"+fmNum+" WHERE waybillState<2 AND garageNumber="+this.garageNumber.Text+" AND ownerId = dbo.getCurrentOwner() and waybillNumber="+this.waybillNumber.Text, this._connection);
		resUpdt = command.ExecuteNonQuery();
		
		// пут. лист
		dataTable = fillTextBoxes("SELECT *, CAST(DATEPART(day, departureDate) AS CHAR(2))+'.'+CAST(DATEPART(month, departureDate) AS CHAR(2))+'.'+CAST(DATEPART(year,departureDate) AS CHAR(4)) departureDate1, CAST(DATEPART(hour,departureDate) AS CHAR(2))+':'+CAST(DATEPART(minute, departureDate) AS CHAR(2)) departureTime1, CAST(DATEPART(day, returnDate) AS CHAR(2))+'.'+CAST(DATEPART(month, returnDate) AS CHAR(2))+'.'+CAST(DATEPART(year,returnDate) AS CHAR(4)) returnDate1, CAST(DATEPART(hour,returnDate) AS CHAR(2))+':'+CAST(DATEPART(minute, returnDate) AS CHAR(2)) returnTime1 FROM waybills WHERE ownerId = dbo.getCurrentOwner() and garageNumber="+this.garageNumber.Text+" AND waybillNumber="+this.waybillNumber.Text,
									new TextBoxItem[] { 
										new TextBoxItem(this.departureKm, "departureKm"), 
										new TextBoxItem(this.departureMh, "departureMh"),
										new TextBoxItem(this.departureDate, "departureDate1"),
										new TextBoxItem(this.departureTime, "departureTime1"),
										new TextBoxItem(this.returnDate, "returnDate1"),
										new TextBoxItem(this.returnTime, "returnTime1"),
										new TextBoxItem(this.formNumber, "formNumber"),
										new TextBoxItem(this.licenceCartNo, "licence"),
										new TextBoxItem(this.way, "way") } );
										
		if (dataTable.Rows.Count > 0) {

			string schedule		= dataTable.Rows[0]["scheduleId"].ToString();
			string waybillType	= dataTable.Rows[0]["waybillTypeId"].ToString();

			// заказчик
			fillTextBoxes("SELECT * FROM customers WHERE customerId = (SELECT TOP 1 customerId  FROM waybillsTasks WHERE ownerId = dbo.getCurrentOwner() and garageNumber="+this.garageNumber.Text+" AND waybillNumber="+this.waybillNumber.Text+" ORDER BY waybillTaskId)", 
							new TextBoxItem[] { new TextBoxItem(this.customerId, "customerId"), new TextBoxItem(this.customerName, "customerName") } );
    
			// прицеп
			fillTextBoxes("SELECT * FROM transportTrailers WHERE trailerGarageNumber=(SELECT trailerGarageNumber FROM waybills WHERE ownerId = dbo.getCurrentOwner() and garageNumber="+this.garageNumber.Text+" AND waybillNumber="+this.waybillNumber.Text+")", 
							new TextBoxItem[] { new TextBoxItem(this.trailerGarageNumber, "trailerGarageNumber"), new TextBoxItem(this.trailerModel, "model"), new TextBoxItem(this.trailerRegistrationNumber, "registrationNumber") } );
			
			// бланк пут.листа
			if (waybillType != null) {
				this._adapter.SelectCommand.CommandText = sqlWaybillTypesList();
				dataTable = new DataTable();
				this._adapter.Fill(dataTable);
				this.waybillTypesList.DataTextField    = "waybillTypeName";
				this.waybillTypesList.DataValueField   = "waybillTypeId";
				this.waybillTypesList.DataSource    = dataTable;
				this.waybillTypesList.DataBind();
				try {
					// если закрыт, то бланк не изменится - тотже
					this.waybillTypesList.Items.FindByValue(waybillType).Selected = true;
				}
				catch(Exception) {
					// если пустой, то из запроса
					this.waybillTypesList.Items.FindByValue(wbType).Selected = true;
				}
			}
			
			// график
			this._adapter.SelectCommand.CommandText = sqlSchedulesList();
			dataTable = new DataTable();
			this._adapter.Fill(dataTable);
			this.schedulesList.DataTextField    = "scheduleName";
			this.schedulesList.DataValueField   = "scheduleId";
			this.schedulesList.DataSource    = dataTable;
			this.schedulesList.DataBind();
			try {
				this.schedulesList.Items.FindByValue(schedule).Selected = true;
			}
			catch(Exception) {
				;
			}
			
			// остатки ?!?!?!
			this._adapter.SelectCommand.CommandText = "SELECT fuel.fuelId, fuel.fuelName +'       :   '+ CAST(isNull(departureRemain,0) AS CHAR(20)) fuelString "+
				" FROM  waybillsFuelRemains "+
				" INNER JOIN fuel ON waybillsFuelRemains.fuelId = fuel.fuelId "+
				" WHERE ownerId = dbo.getCurrentOwner() and garageNumber="+this.garageNumber.Text+" AND waybillNumber="+this.waybillNumber.Text;
			dataTable = new DataTable();
			this._adapter.Fill(dataTable);
			this.fuelRemains.DataTextField    = "fuelString";
			this.fuelRemains.DataValueField   = "fuelId";
			this.fuelRemains.DataSource    = dataTable;
			this.fuelRemains.DataBind();
			
			// список водителей
			this._adapter.SelectCommand.CommandText = "SELECT driverId, '"+this._driverPrefix+"'+string+(CASE WHEN drivingLicenceNumber IS NULL OR drivingLicenceNumber=' ' THEN '' ELSE ' No:' END)+isNull(drivingLicenceNumber,'') string FROM drivers d WHERE driverId IN(SELECT driverId FROM waybillsDrivers WHERE ownerId = dbo.getCurrentOwner() and garageNumber="+this.garageNumber.Text+" AND waybillNumber="+this.waybillNumber.Text+")";
			dataTable = new DataTable();
			this._adapter.Fill(dataTable);
			this.driversList.DataTextField    = "string";
			this.driversList.DataValueField   = "driverId";
			this.driversList.DataSource    = dataTable;
			this.driversList.DataBind();
			
			// создать XML
			createPrintingXml();
			// установить флаг печати
			this.message.Text += "<script language=\"JavaScript\">PrintEnabled = true;</script>"; // ?!?!?!?
			if (resUpdt == 0) {
				this.printMessage.Text += "<br/> Путевой лист закрыт, изменения невозможны<script language=\"JavaScript\">alert('Путевой лист закрыт, изменения невозможны.\\n\\nПутевой лист будет напечатан на бланке на котором был выдан.\\n\\n"+this.waybillTypesList.SelectedItem.Text+"\\n\\n');</script>";
			}
		}
		else {
			this.message.CssClass = "warning";
			this.message.Text = "путевой лист не найден";
			clearElements(); this.formNumber.Text = "";
			this.activeField.Text = "garageNumber";
		}
	}
	else {
		// нет автомобиля
		this.message.CssClass = "warning";
		this.message.Text = "нет данных по автомобилю";
	}

	this._connection.Close();
	  
	clearElements();
	this.formNumber.Text = "";
	this.departureDate.Text = saveDepartureDate;
	
  }
  
  
  //
  // ЗАПИСЬ В БАЗУ ДАННЫХ
  //
  private void putWaybill() {
      return;
	
  /* *** */
	System.Configuration.AppSettingsReader configSettings = new System.Configuration.AppSettingsReader();
	string debug;
	try {
  	debug = ((string)(configSettings.GetValue("debug", typeof(string))));
  }
  catch(Exception) {
  	debug = null;
  }

  if (debug == "true") {
  	return;
  }
  /* *** */

			
	SqlParameter param, param1, param2, param3;
	  
	this._connection = new SqlConnection(System.Configuration.ConfigurationSettings.AppSettings["connectionString"]);
	  
	// запись в пут. листы waybills and waybillsTasks
	SqlCommand command = new SqlCommand("waybillIssue", this._connection);
	command.CommandTimeout = 65;
	command.CommandType = CommandType.StoredProcedure;
	this._connection.Open();

	param = command.Parameters.Add("@garageNumber", SqlDbType.Int);
	param.Value = this.garageNumber.Text;
	param = command.Parameters.Add("@waybillNumber", SqlDbType.Int);
	param.Value = this.waybillNumber.Text;
	param = command.Parameters.Add("@departureDate", SqlDbType.Char, 20);
    param.Value = this.departureDate.Text + " " + this.departureTime.Text;
    param = command.Parameters.Add("@returnDate", SqlDbType.Char, 20);
    param.Value = this.returnDate.Text + " " + this.returnTime.Text;
	param = command.Parameters.Add("@formNumber", SqlDbType.Int);
	param.Value = this.formNumber.Text;
	param = command.Parameters.Add("@way", SqlDbType.VarChar, 50);
	param.Value = this.way.Text;
	param = command.Parameters.Add("@trailerGarageNumber", SqlDbType.Int);
	param.Value = (this.trailerGarageNumber.Text.Length==0 ? null : this.trailerGarageNumber.Text);
	param = command.Parameters.Add("@licenceCartNo", SqlDbType.Int);
	param.Value = (this.licenceCartNo.Text.Length==0 ? null : this.licenceCartNo.Text);
	param = command.Parameters.Add("@waybillTypeId", SqlDbType.Int);
	param.Value = this.waybillTypesList.SelectedItem.Value;
	param = command.Parameters.Add("@scheduleId", SqlDbType.Int);
	param.Value = this.schedulesList.SelectedItem.Value;
	param = command.Parameters.Add("@shift", SqlDbType.Int);
	param.Value = this.shift.Text;
	param = command.Parameters.Add("@customerId", SqlDbType.Int);
	param.Value = (this.customerId.Text.Length==0 ? null : this.customerId.Text);

	command.ExecuteNonQuery();

	// водители
	command.CommandText = "waybillIssueDrivers";
	command.Parameters.Clear();
	param = command.Parameters.Add("@garageNumber", SqlDbType.Int);
	param.Value = this.garageNumber.Text;
	param1 = command.Parameters.Add("@waybillNumber", SqlDbType.Int);
	param1.Value = this.waybillNumber.Text;
	param2 = command.Parameters.Add("@driverId", SqlDbType.Int);
	param3 = command.Parameters.Add("@responsible", SqlDbType.Int);
	for (int i=0; i<this.driversList.Items.Count; i++) {
		param2.Value = this.driversList.Items[i].Value;
		param3.Value = (this.driversList.Items[i].Selected ? "1" : null);
		command.ExecuteNonQuery();
	}
	// для определения мат.отв.
	param2.Value = null;
	param3.Value = null;
	command.ExecuteNonQuery();
	  
	this._connection.Close();
  }
 
}