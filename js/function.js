var jobs ={
	"技术类":{
		"Web Developer":[
		"计算机或相关专业大学本科以上学历",
		"3年以上前端开发相关工作经验",
		"熟悉MySQL/WinSQL",
		"精通HTML，能够书简明清晰，可读性高的HTML结构代码",
		"精通CSS，熟悉网站Div+CSS标准化布局，具有手写Html代码和CSS代码能力",
		"精通JavaScript，熟悉JQuery、YUI等主流框架者优先",
		"能解决常见浏览器的兼容性问题，熟悉IE、Firefox、等主流浏览器的常见兼容性问题",
		"有PHP/.Net开发经验者优先",
		"英语口语可沟通者优先"
		],
		".Net Senior Software Engineer":[
		"Degree (or above) in Computer Science or equivalent.",
		"At least 4 years of solution architecture experience",
		"Solid understanding of the following technologies (C#, .NET, XML, Web Services, Single Sign-On) and databases (Oracle, MS SQL)",
		"Good understanding on design patterns.",
		"Experience with SharePoint is a plus",
		"Exemplary communication skills in both Mandarin and English",
		"Strong sense of ownership, urgency, and drive.",
		"Strong teamwork and interpersonal skills."
		],
		"Mobile Developer(ios/Android)":[
		"Minimum 2 years working experience in native mobile and web-optimised development",
		"Must have mobile development experience in HTLM5,ioS,iphone or ipad",
		"Familiar with Service Oriented Architecture and web technologies",
		"Passion to push the boundaries of mobile development to create innovation solution",
		"Fluency in English and Chinese advantageous."
		]
	},
	"市场类":{
		"Senior Digital Marketing Manager":[
		"More than 3 years experience in the IT & Pharmaceutical industry, and basic understanding of IT services and pharmaceutical requirements.",
		"Good communication and document writing skills.",
		"Good English reading and writing capabilities.",
		"Strong work experiences with top 10 pharmaceutical companies globally."
		]
	},
	"管理类":{
		"QA Manager 品质主管/经理":[
		"B.S. Computer Science or equivalent",
		"Having at least 3-year work experience as Quality Analyst in a supervisory role or similar position",
		"Being highly analytical and having strong communication capabilities",
		"Strong organizational, people management, project management and customer interaction skills.",
		"Excellent teamwork and leadership skills.",
		"Familiar with the Excel Macros / VBA;",
		"Familiar with quality assurance such as CMMI , 6 sigma etc. is a plus;",
		"Proven experience in software development and QA methodology.",
		"Fluent in reading/writing/speaking both English and Chinese."
		]
	}
}
function job(type){
	var list = jobs[type];
	var html = '';
	for(var a in list){		
		html+='<li>'+a+'</li>'
	}
	$(".job-list").html(html);
	listener();
}
function jobDetail(type,jobname){
	var description = jobs[type][jobname];
	var html = '';	
	for(var i=0; i<description.length; i++){
		var a = i + 1;
		html+='<li>'+a+'. '+description[i]+'</li>'
	}
	html+='<li><b>Please send your CV and cover letter to: dalian_hr@innocellence.com</b></li>';
	$(".job-detail .job-name").text(jobname);
	$(".job-description").html(html);
	$(".shadow").show();
	$(".job-detail").show();
} 
function listener(){
	$(".job-list li").click(function(){
		var type = $(".job-type li.active a").text();
		var jobname = $(this).text();
		jobDetail(type,jobname);
	});
	$("#close,.shadow").click(function(){
		$(".shadow").hide();
		$(".job-detail").hide();
	});
}