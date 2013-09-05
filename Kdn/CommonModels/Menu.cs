using System;
using System.Collections.Generic;
using System.Collections;
using System.Text;
using Kdn.Ext.Attributes;
using Kdn.Interfaces;
using Castle.ActiveRecord;
using Newtonsoft.Json;
using NHibernate.Criterion;

namespace Kdn.CommonModels
{
    [Model, ActiveRecord("Menu", Polymorphism = Polymorphism.Implicit)]
    public class Menu:ActiveRecordBase<Menu>
    {

#region static method
        
        static Menu _AdminMenu;
        public static Menu AdminMenu { get { return _AdminMenu; } }
        static Menu()
        {
            _AdminMenu = new Menu()
            {
                text = "Администрирование",
                iconCls="icon-setting_tools32",
                Child = new List<Menu>()
                {
                    new Menu(){
                        text="Пользователи",
                        iconCls="icon-user",
                        Handler="createView",
                        HandlerCfg="{xtype:'kdn.view.user',single:true}"
                    },
                    new Menu(){
                        text="Группы пользователей",
                        iconCls="icon-group",
                        Handler="createView",
                        HandlerCfg="{xtype:'kdn.view.usergroup',single:true}"
                    },
                    new Menu(){
                        text="Меню приложения",
                        iconCls="icon-menu",
                        Handler="createView",
                        HandlerCfg = "{xtype:'kdn.view.menu',single:true}"
                    },
                    new Menu(){
                        text="Обновить схему БД",
                        iconCls="icon-database_refresh",
                        Handler="updateDatabase"
                    },
                    new Menu(){
                        text="Пересоздать БД",
                        iconCls="icon-database_lightning",
                        Handler="reCreateDatabase"
                    },
                    new Menu(){
                        text="HQL Analyzer",
                        iconCls="icon-sql"
                    }
                }
            };
        }


        public static List<Menu> ForUser()
        {
            return ForUser(User.GetCurrent());
        }
        public static List<Menu> ForUser(IUser user)
        {
            IList<Menu> menu = Menu.FindAll(Expression.Where<Menu>(x => x.Parent == null));
            List<Menu> _menu = new List<Menu>();
            if (user.isAdmin)
            {
                _menu.Add(Menu.AdminMenu);
            }
            _menu.AddRange(menu);
            return _menu;
        }

#endregion

        protected IList<Menu> _Child;

        [IdProperty,PrimaryKey]        
        public int MenuId { get; set; }
        [Property]
        public string text { get; set; }
        [Property]
        public string iconCls { get; set; }
        [Property]
        public int Sequence { get; set; }
        [Property]
        public string Handler { get; set; }
        [Property]
        public string HandlerCfg { get; set; }

        [BelongsTo("ParentMenuId"),JsonIgnore]
        public Menu Parent { get; set; }

        [HasMany(Lazy = true, Inverse = true, Cascade = ManyRelationCascadeEnum.All, ColumnKey = "ParentMenuId", OrderBy = "Sequence")]
        public IList<Menu> Child
        {
            get
            {
                return _Child;
            }
            set {
                foreach (var v in value)
                {
                    v.Parent = this;
                }
                this._Child = value;
           }
        }

        

    }
}
