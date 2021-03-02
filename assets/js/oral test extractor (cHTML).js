function cHTML(Sel, Out, Out2, StNum, Engender, Groups, List, List2, Prefix, Dir, ImgType, Surname, ImgName) {

    this.Sel = Sel;
    this.Out = Out;
    this.Out2 = Out2;
    this.StNum = StNum; //numero di studenti per ogni gruppo
    this.Engender = Engender;
    this.Groups = Groups;
    this.List = List;
    this.List2 = List2;
    this.Prefix = Prefix;
    this.Dir = Dir;
    this.ImgType = ImgType;
    this.Surname = Surname;
    this.ImgName = ImgName;

    this.ol = undefined;
    this.ul = undefined;
    this.x = undefined; //numero di studenti per ogni gruppo
    this.Surname.sort();
    this.StudentsIn = this.Surname.length;
    this.StudentsVec = [];
    this.Index = [];
    this.RemovedIndex = [];
    this.Ver = true; //vedi in fondo per verificare se devo o meno riempire totalmente il vettore
    this.SurList = []; //lista dei cognomi estratti

//FUNZIONI DI SUPPORTO

    this.FillVec = function() {
        for(var i = 0; i < this.Surname.length; ++i) { this.Index.push(i); }
    }

    this.MakeStudentVec = function() {
        for(let i = 0; i < this.Surname.length; ++i) {
            let StudentOb = new Object;
            StudentOb.In = true;
            StudentOb.Surname = this.Surname[i];
            StudentOb.ListIndex = i;
            this.StudentsVec.splice(i, 0, StudentOb);
        }
    }

    this.Verify = function() { //come riempo i vettore indici?
        this.Index.splice(0, this.Index.length);
        for (var i = 0; i < this.Surname.length; ++i) {
            this.Ver = this.StudentsVec[i].In;
            if (this.Ver == false) break;
        }
        if (this.Ver == false) { //se ci sono elementi esclusi, riempio il vettore degli indici in modo diverso
            for (var i = 0; i < this.Surname.length; ++i) {
                if (this.StudentsVec[i].In) { this.Index.push(i); }
            } 
        }
        else { this.FillVec(); } // se non ci sono elementi esentati da estrazione, riempio il vettore degli indici per intero 
    }

//REGISTRO (CON FUNZIONI RELATIVE) E LISTA INTERROGATI

    this.DoList = function() { //registro
        var d, d2, li;
        this.List.innerHTML = null;
        this.List.appendChild(d = document.createElement("DIV"));
        //d.style.width = "fit-content"; non serve, già in classe "head", in cui si trova il div contenente id=List
        d.style.margin = "0px auto";
        d.style.textAlign = "left";
        d.innerHTML = "<hr color='black'><input type='button' class='Ex' value='Exclude all students' onclick='" + this.Prefix + "ExcludeAll()'> &nbsp;"
                    + "<input type='button' class='Ex' value='Insert all students' onclick='" + this.Prefix + "InsertAll()'>" 
                    + "<br><hr color='black'><h2><b><u>Students List</u></b></h2>";
        d.appendChild(this.ol = document.createElement("OL"));
        for(var i = 0; i < this.Surname.length; ++i) {
            if(this.StudentsVec[i].In) {
                if(i >= 1){
                    this.ol.appendChild(li = document.createElement("LI")); 
                    li.innerHTML = this.Surname[i] + "&nbsp; &nbsp; <input class='Ex' type='button' value='Exclude' onclick='" + 
                                   this.Prefix + "RemoveItem(" + i + ")'> <hr color='black'>";
                }
                else {
                    this.ol.appendChild(li = document.createElement("LI")); 
                    li.innerHTML = "<hr color='black'>" + this.Surname[i] + "&nbsp; &nbsp; <input class='Ex' type='button' value='Exclude' onclick='" + 
                                    this.Prefix + "RemoveItem(" + i + ")'> <hr color='black'>";
                }
            }
            else {
                if(i >= 1){
                    this.ol.appendChild(li = document.createElement("LI")); 
                    li.innerHTML = this.Surname[i] + "&nbsp; &nbsp; <input class='Ex' type='button' value='Insert' onclick='" + 
                                   this.Prefix + "InsertItem(" + i + ")'> <hr color='black'>";
                }
                else {
                    this.ol.appendChild(li = document.createElement("LI")); 
                    li.innerHTML = "<hr color='black'>" + this.Surname[i] + "&nbsp; &nbsp; <input class='Ex' type='button' value='Insert' onclick='" + 
                                   this.Prefix + "InsertItem(" + i + ")'> <hr color='black'>";
                }
            }
        }
    }

    this.RemoveItem = function(i) {
        this.StudentsVec[i].In = false;
        this.StudentsIn -= 1;
        this.DoList();
        this.List2.style.display = "none";
    }

    this.ExcludeAll = function() {
        for (let i = 0; i < this.Surname.length; ++i) { this.StudentsVec[i].In = false; }
        this.StudentsIn = 0;
        this.DoList();
        this.List2.style.display = "none";
    }

    this.InsertItem = function(i) {
        this.StudentsVec[i].In = true;
        this.StudentsIn += 1;
        this.DoList();
        this.List2.style.display = "none";
    }

    this.InsertAll = function() {
        for (let i = 0; i < this.Surname.length; ++i) { this.StudentsVec[i].In = true; }
        this.StudentsIn = this.Surname.length;
        this.DoList();
        this.List2.style.display = "none";
    }

    this.DoList2 = function() { //lista interrogati gruppi
        if (this.SurList.length != 0) {
            this.List2.style.display = "block";
            this.List2.innerHTML = null;

            var li, ElementCounter = 1, GroupCounter = 1, dv, dv2;

            this.List2.appendChild(dv = document.createElement("DIV"));
            dv.innerHTML = "<h2><b><u>Death List</u></b></h2>";
            dv.style.margin = "0px auto";
            dv.appendChild(this.ul = document.createElement("UL"));
            for(var i = 0; i < this.SurList.length; ++i) {
                if(i == 0) {
                    var d;
                    this.ul.appendChild(d = document.createElement("DIV"));
                    d.innerHTML = "<h3><b><u>Group " + GroupCounter + "</u></b></h3>";
                    this.ul.appendChild(li = document.createElement("LI")); 
                    li.innerHTML = this.SurList[0];
                    GroupCounter += 1;
                }
                else {
                    if(ElementCounter < this.x) {
                        this.ul.appendChild(li = document.createElement("LI")); 
                        li.innerHTML = this.SurList[i];
                        ElementCounter += 1;
                    }
                    else if(ElementCounter == this.x) {
                        var d;
                        this.ul.appendChild(d = document.createElement("DIV"));
                        d.innerHTML = "<h3><b><u>Group " + GroupCounter + "</u></b></h3>";
                        this.ul.appendChild(li = document.createElement("LI")); 
                        li.innerHTML = this.SurList[i];
                        GroupCounter += 1;
                        ElementCounter = 1;
                    }
                }
            }
            this.SurList.splice(0, this.SurList.length); //svuotare surlist
        }
        else { this.List2.style.display = "none"; } 
    }

    this.DoList3 = function() { //lista interrogati da estrazione totale
        if (this.SurList.length != 0) {
            this.List2.style.display = "block";
            this.List2.innerHTML = null;
            var li, dv;
            this.List2.appendChild(dv = document.createElement("DIV"));
            dv.innerHTML = "<h2><b><u>Death List</u></b></h2>";
            dv.margin = "0px auto";
            this.List2.appendChild(this.ul = document.createElement("UL"));
            for(var i = 0; i < this.SurList.length; ++i) {
                if(i == 0) {
                    this.ul.appendChild(document.createElement("DIV"));
                    this.ul.appendChild(li = document.createElement("LI")); 
                    li.innerHTML = this.SurList[0];
                }
                else {
                    this.ul.appendChild(li = document.createElement("LI")); 
                    li.innerHTML = this.SurList[i];
                }
            }
            this.SurList.splice(0, this.SurList.length); //svuotare surlist
        }
        else { this.List2.style.display = "none"; } 
    }

//FUNZIONE PER LA SCELTA
        
    this.Choose = function(Index) {
        if(Index == 1) { this.Verify(); this.ViewerOne(); } //sigola estrazione
        else if(Index == 2) { this.ChooseStudents(); } //estrazione a gruppi
        else if(Index ==3) { this.MakeButTotEx(); } //estrazione totale
        else { this.Out.innerHTML = this.Groups.innerHTML = null; this.Out2.style.display = this.List2.style.display = "none"; }
    }

//ESTRAZIONE SINGOLA

    this.ViewerOne = function() { 
        var d;
        this.Out.innerHTML = this.Groups.innerHTML = null; this.Out2.style.display = this.List2.style.display = "none";
        if (this.Index.length >= 2) {
            var r = Math.floor(Math.random()*this.Index.length);
            this.Out.innerHTML = "<div align='center'> <img id='ImgOne' src='" + this.Dir + this.StudentsVec[this.Index[r]].ListIndex + this.ImgType + 
                                "' width=162px height=154px> &nbsp; <h2 class='Txt'><b><u>" + this.StudentsVec[this.Index[r]].Surname + "</u></b></h2> </div>" + 
                                "<br> <input class='Yel' type='button' value='Extract again' onclick='" + this.Prefix + "Verify(); " + this.Prefix + "ViewerOne();'>";
            if(this.StudentsVec[this.Index[r]].Surname == "Romairone") {
                this.Out.appendChild(d = document.createElement("DIV"));
                d.innerHTML = "<h3><u><b class='txt'>Mi sono fregato con le mie mani!!!</b></u><h3>";
            }
        }
        else { 
            alert('Please insert at least two students and click "Extract again"'); 
            this.Out.innerHTML = "<input class='Yel' type='button' value='Extract again' onclick='" + this.Prefix + "Verify(); " + this.Prefix + "ViewerOne();'>"
        }
    }

//ESTRAZIONE A GRUPPI

    this.ChooseStudents = function() {
        this.Out.innerHTML = this.Groups.innerHTML = null; this.Out2.style.display = this.List2.style.display = "none"; 
        this.Out2.style.display = "block";
        this.StNum.style.textAlign = "center";
        this.Engender.onclick = new Function(this.Prefix + "Verify(); " + this.Prefix + "ViewerGroups();");
    }

    this.ViewerGroups = function() {

        this.x = parseInt(this.StNum.value);
        var g, g2, g3, GroupCount = 1;
        
        this.Groups.innerHTML = null; 
        this.Groups.appendChild(document.createElement("BR"));
        this.Groups.appendChild(document.createElement("BR"));

        if(this.x == undefined || this.x == "" || isNaN(this.x) || this.x > this.StudentsVec.length) { alert("error: the string digited is useless! Please digit a valid number."); }
        if (this.x < 2) { alert("the lesser number in a group is two!!!"); }

        if(this.Index.length >= 3) {
            if(this.x >= 2) {
                for(var i = 0; i < Math.ceil(this.StudentsIn / this.x); ++i) {
                    this.Groups.appendChild(document.createElement("BR"));
                    this.Groups.appendChild(g3 = document.createElement("DIV"));
                    g3.style.width = "fit-content";
                    g3.style.width = "-moz-fit-content";
                    g3.style.margin = "0px auto";
                    g3.style.margin = "0px -moz-auto";
                    g3.appendChild(g = document.createElement("DIV"));
                    g.style.width = "fit-content";
                    g.style.width = "-moz-fit-content";
                    g.style.margin = "0px auto";
                    g.style.margin = "0px -moz-auto";
                    g.innerHTML = "<h1 style='background-color:yellow; width:fit-content; width: -moz-fit-content; border:solid;'><u><b>" + 
                                  "Group " + GroupCount + "</b></u></h1>";
                    g3.appendChild(document.createElement("BR")); 
                    for(var z = 0; z < this.x; ++z) {
                        var r = Math.floor(Math.random()*this.Index.length);
                        g3.appendChild(g = document.createElement("DIV"));
                        g.style.float = "left";
                        if (this.StudentsVec[this.Index[r]] == undefined) { g.innerHTML = "&nbsp;"; }
                        else {
                            g.innerHTML = "<img src='" + this.Dir + this.StudentsVec[this.Index[r]].ListIndex + this.ImgType + 
                                          "' width='122px' height='118' class='ImgGroup'> &nbsp; <h2 class='Txt'><b><u>" + 
                                          this.StudentsVec[this.Index[r]].Surname + "</u></b></h2>";
                            this.SurList.push(this.StudentsVec[this.Index[r]].Surname);
                            this.Index.splice(r, 1);
                        }
                    }
                GroupCount += 1;
                this.Groups.appendChild(g2 = document.createElement("DIV"));
                g2.style.clear = "both";
                }
                this.DoList2();
            }
            else { this.Group.innerHTML = null; this.List2.style.display = "none"; }
        }
        else { alert('Please insert at least three students and click "Engender"'); }
    }
    
//ESTRAZIONE TOTALE

    this.MakeButTotEx = function() {
        this.Out.innerHTML = this.Groups.innerHTML = null; this.Out2.style.display = this.List2.style.display = "none"; 
        this.Groups.innerHTML = "<input type='button' style='margin: 0px auto;' value='Extract all the students (who are in list)' class='Yel' onclick='" +
                                this.Prefix + "Verify(); " + this.Prefix + "TotEx();'>";
    }

    this.TotEx = function() {
        var d, d2, d3;

        this.Out.innerHTML = this.Groups.innerHTML = null; this.Out2.style.display = this.List2.style.display = "none";  

        this.Out.innerHTML = this.Groups.innerHTML = null; this.Out2.style.display = "none"; 
        this.Groups.innerHTML = "<input type='button' style='margin: 0px auto;' value='Extract again' class='Yel' onclick='" +
                                this.Prefix + "Verify(); " + this.Prefix + "TotEx();'>";

        this.Groups.appendChild(document.createElement("BR"));
        this.Groups.appendChild(document.createElement("BR"));

        this.Groups.appendChild(d = document.createElement("DIV"));
        d.style.margin = "0px auto";
        d.style.width = "fit-content";

        for(var i = 0; i < this.StudentsIn; ++i) {
            var r = Math.floor(Math.random()*this.Index.length);
            d.appendChild(d2 = document.createElement("DIV"));
            d2.style.float = "left";
            if (this.StudentsVec[this.Index[r]] == undefined) { d2.innerHTML = "&nbsp;"; }
            else {
                d2.innerHTML = "<img src='" + this.Dir + this.StudentsVec[this.Index[r]].ListIndex + this.ImgType + 
                              "' width='122px' height='118' class='ImgGroup'> &nbsp; <h2 class='Txt'><b><u>" + 
                              this.StudentsVec[this.Index[r]].Surname + "</u></b></h2>";
                this.SurList.push(this.StudentsVec[this.Index[r]].Surname);
                this.Index.splice(r, 1);
            }
        }
        d.appendChild(d3 = document.createElement("DIV"));
        d3.style.clear = "both";
        this.Groups.appendChild(document.createElement("BR"));
        this.Groups.appendChild(document.createElement("BR"));
        this.DoList3();
    }


    this.MakeStudentVec();
    this.FillVec();
    this.DoList();
}
