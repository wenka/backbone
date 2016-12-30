$(function(){

	//创建一个 学生 Model
	var Student = Backbone.Model.extend({

		//默认值
		defaults:function(){
			return {
				name:"未命名",
				selected:false,
				id:Students.nextId()
			}
		},
		//初始化使判断
		initialize:function(){
			if(!this.get("name")){
				this.set("name",this.defaults().name);
			}
		},

		//标记是否被选中
		toggle:function(){
			this.save({selected:!this.get("selected")});
		}

	});

	//创建学生的集合
	var Students = Backbone.Collection.extend({

		model:Student,

		//储存
		localStorage:new Backbone.LocalStorage("Student-Table"),

		//返回被选中学生的集合
		selected:function(){
			return this.filter(function(student){
				return student.get("selected");
			});
		},

		//分配Id
		nextId:function(){
			if (!this.length) {
				return 1
			}else{
				return this.last().get("id")+1;
			}
		}
	});

	var Students = new Students;

	//每一个条目的视图
	var StudentView = Backbone.View.extend({

		tagName:"tr",

		//将相应模板写入template属性中，_.template()为underscore.js中的方法
		template:_.template($('#item-template').html()),

		//绑定该tr下的事件
		events:{
			"click .choose":"toggleSelect", //选择
			"click .show":"edit", //编辑
			"click .destroy":"clear", //删除单条
			"blur .edit":"close" //保存编辑
		},

		initialize:function(){
			//model发生变化就重新渲染视图
			this.listenTo(this.model,'change',this.render);

			//销毁model
			this.listenTo(this.model,'destroy',this.remove);
		},

		//$er ： tr
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));

			this.$(".edit").hide();

			return this;
		},

		//标记已经选中
		toggleSelect:function(){
			this.model.toggle();
		},

		edit:function(){
			this.$('.show').hide();
			this.$(".edit").show();
		},

		//删除此模型
		clear:function(){
			this.model.destroy();
		},

		close:function(){
			var name = this.$(".edit").val();
			if (name == "") {
				this.model.save("name","未命名");
			}else{
				this.model.save("name",name);
			}
			this.$('.show').show();
			this.$(".edit").hide();
		}
	});


	
	//View:这个视图表示$("#content")，用来表现整个学生表格
	var AppView=Backbone.View.extend({

		//指定标签
		el:$("#content"),

		//右下角删除学生数目的模板
		statsTemplate:_.template($('#stats-template').html()),

		//这是事件
		events:{
			"click #add":"addNewStudent", //点击添加按钮触发事件
			"click #clear-selected":"clearSelected", //点击清空已选择按钮触发事件
			"click #select-all":"selectAll" //点击全选
		},

		initialize:function(){

			this.allCheckbox=$("#select-all");
			this.main=$("#main");
			this.footer=$('footer');
			this.name=$("#new-name");

			//Collection中增加一个Model就触发add事件
			this.listenTo(Students,'add',this.addOne);

			//一旦调用fetch方法就触法reset事件
			this.listenTo(Students,'reset',this.addAll);

			//all事件表示该View下的所有事件，即触法任意事件就触法all事件
			this.listenTo(Students,'all',this.render);

			//从本地数据库中获取所有学生
			Students.fetch();
		},

		//渲染视图
		render:function(){
			var selected=Students.selected().length;
			if(Students.length){
				this.main.show();
				this.footer.show();
				this.footer.html(this.statsTemplate({selected:selected}));
			}else{
				this.main.hide();
				this.footer.hide();
			}
			//判断所有学生是否被选中
			this.allCheckbox.attr("checked",selected==Students.length?true:false);
		},

		//增加一个学生，同时将model传入StudentView中
		addOne:function(student){
			var student=new StudentView({model:student});
			//将渲染后的每一列添加到表格中
			this.$("#list").append(student.render().el);
		},

		//增加所有学生，通过Collection.each依次调用addOne方法
		addAll:function(){
			Students.each(this.addOne,this);
		},

		//增加一个新学生
		addNewStudent:function(){
			Students.create({name:this.name.val()});
			this.name.val('');
		},

		//删除选中列，_.invoke(集合,方法)
		clearSelected:function(){
			_.invoke(Students.selected(),'destroy');
		},

		//选中所有
		selectAll:function(){
			var selected=this.allCheckbox.attr('checked')=="checked";
			Students.each(function(student){
				student.save({'selected':selected});
			});
		}

	});

	//创建View
	var App=new AppView;

})