/*1.Use the reduce method in combination with the concat method to “flatten” an array of arrays into a 
single array that has all the elements of the input arrays.
*/
var arrays = [[1, 2, 3], [4, 5], [6]];

/*
stringIt function takes an array, w/c may or may not contain an array-type element, as argument.
-it has an output array arr2 in which converted elements will be pushed.
-first, iteration must be made to each element of da main array to check if it's still an array or not
-if it is not an array then push the element to the output array, else, the function will recursively
call itself with the element as argument

*/
function stringIt(arr){
	var arr2 = [];
	function makeStr(arr){
		arr.forEach(function(el){
				if(typeof el != "object"){
				arr2.push(el);	
				}
				else makeStr(el);
			}			
		);
	}
	makeStr(arr);
	return arr2;
}

stringIt(arrays);
//[1, 2, 3, 4, 5, 6]

var arrays2 = [[1,[2,3]],[4,[5,6]]];

stringIt(arrays2);
//[1, 2, 3, 4, 5, 6]

var arrays3 = [1,2,3,4,5,6];

stringIt(arrays3);

[1, 2, 3, 4, 5, 6];

var arrays4 = [[1,[2,"cool"]],[4,["daw",6]]];

stringIt(arrays4);
//[1, 2, "cool", 4, "daw", 6];


/* 2.Using the example data set from this chapter, compute the average age difference between mothers and children (the age of the mother when the child is born). You can use the average function defined earlier in this chapter.

Note that not all the mothers mentioned in the data are themselves present in the array. The byName object, which makes it easy to find a person’s object from their name, might be useful here.
*/

//Data used in this exercise (and in the chapter example):

var ANCESTRY_FILE = JSON.stringify([
  {"name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel"},
  {"name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme"},
  {"name": "Maria de Rycke", "sex": "f", "born": 1683, "died": 1724, "father": "Frederik de Rycke", "mother": "Laurentia van Vlaenderen"},
  {"name": "Jan van Brussel", "sex": "m", "born": 1714, "died": 1748, "father": "Jacobus van Brussel", "mother": "Joanna van Rooten"},
  {"name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"},
  {"name": "Jan Frans van Brussel", "sex": "m", "born": 1761, "died": 1833, "father": "Jacobus Bernardus van Brussel", "mother":null},
  {"name": "Pauwels van Haverbeke", "sex": "m", "born": 1535, "died": 1582, "father": "N. van Haverbeke", "mother":null},
  {"name": "Clara Aernoudts", "sex": "f", "born": 1918, "died": 2012, "father": "Henry Aernoudts", "mother": "Sidonie Coene"},
  {"name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm"},
  {"name": "Lieven de Causmaecker", "sex": "m", "born": 1696, "died": 1724, "father": "Carel de Causmaecker", "mother": "Joanna Claes"},
  {"name": "Pieter Haverbeke", "sex": "m", "born": 1602, "died": 1642, "father": "Lieven van Haverbeke", "mother":null},
  {"name": "Livina Haverbeke", "sex": "f", "born": 1692, "died": 1743, "father": "Daniel Haverbeke", "mother": "Joanna de Pape"},
  {"name": "Pieter Bernard Haverbeke", "sex": "m", "born": 1695, "died": 1762, "father": "Willem Haverbeke", "mother": "Petronella Wauters"},
  {"name": "Lieven van Haverbeke", "sex": "m", "born": 1570, "died": 1636, "father": "Pauwels van Haverbeke", "mother": "Lievijne Jans"},
  {"name": "Joanna de Causmaecker", "sex": "f", "born": 1762, "died": 1807, "father": "Bernardus de Causmaecker", "mother":null},
  {"name": "Willem Haverbeke", "sex": "m", "born": 1668, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
  {"name": "Pieter Antone Haverbeke", "sex": "m", "born": 1753, "died": 1798, "father": "Jan Francies Haverbeke", "mother": "Petronella de Decker"},
  {"name": "Maria van Brussel", "sex": "f", "born": 1801, "died": 1834, "father": "Jan Frans van Brussel", "mother": "Joanna de Causmaecker"},
  {"name": "Angela Haverbeke", "sex": "f", "born": 1728, "died": 1734, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"},
  {"name": "Elisabeth Haverbeke", "sex": "f", "born": 1711, "died": 1754, "father": "Jan Haverbeke", "mother": "Maria de Rycke"},
  {"name": "Lievijne Jans", "sex": "f", "born": 1542, "died": 1582, "father":null, "mother":null},
  {"name": "Bernardus de Causmaecker", "sex": "m", "born": 1721, "died": 1789, "father": "Lieven de Causmaecker", "mother": "Livina Haverbeke"},
  {"name": "Jacoba Lammens", "sex": "f", "born": 1699, "died": 1740, "father": "Lieven Lammens", "mother": "Livina de Vrieze"},
  {"name": "Pieter de Decker", "sex": "m", "born": 1705, "died": 1780, "father": "Joos de Decker", "mother": "Petronella van de Steene"},
  {"name": "Joanna de Pape", "sex": "f", "born": 1654, "died": 1723, "father": "Vincent de Pape", "mother": "Petronella Wauters"},
  {"name": "Daniel Haverbeke", "sex": "m", "born": 1652, "died": 1723, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
  {"name": "Lieven Haverbeke", "sex": "m", "born": 1631, "died": 1676, "father": "Pieter Haverbeke", "mother": "Anna van Hecke"},
  {"name": "Martina de Pape", "sex": "f", "born": 1666, "died": 1727, "father": "Vincent de Pape", "mother": "Petronella Wauters"},
  {"name": "Jan Francies Haverbeke", "sex": "m", "born": 1725, "died": 1779, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"},
  {"name": "Maria Haverbeke", "sex": "m", "born": 1905, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"},
  {"name": "Petronella de Decker", "sex": "f", "born": 1731, "died": 1781, "father": "Pieter de Decker", "mother": "Livina Haverbeke"},
  {"name": "Livina Sierens", "sex": "f", "born": 1761, "died": 1826, "father": "Jan Sierens", "mother": "Maria van Waes"},
  {"name": "Laurentia Haverbeke", "sex": "f", "born": 1710, "died": 1786, "father": "Jan Haverbeke", "mother": "Maria de Rycke"},
  {"name": "Carel Haverbeke", "sex": "m", "born": 1796, "died": 1837, "father": "Pieter Antone Haverbeke", "mother": "Livina Sierens"},
  {"name": "Elisabeth Hercke", "sex": "f", "born": 1632, "died": 1674, "father": "Willem Hercke", "mother": "Margriet de Brabander"},
  {"name": "Jan Haverbeke", "sex": "m", "born": 1671, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
  {"name": "Anna van Hecke", "sex": "f", "born": 1607, "died": 1670, "father": "Paschasius van Hecke", "mother": "Martijntken Beelaert"},
  {"name": "Maria Sturm", "sex": "f", "born": 1835, "died": 1917, "father": "Charles Sturm", "mother": "Seraphina Spelier"},
  {"name": "Jacobus Bernardus van Brussel", "sex": "m", "born": 1736, "died": 1809, "father": "Jan van Brussel", "mother": "Elisabeth Haverbeke"}
]);

//convert it to an array:

var ancestry = JSON.parse(ANCESTRY_FILE);

//the useful functions from the book examples:

function average(arr){
	function plus(a,b){
		return a+b;
	}
	return arr.reduce(plus)/arr.length;
}

function age(p){
	return p.died - p.born;
}

var byName = {};

//to be able to retrieve the full data of a person in the array from his/her name (if data is present)
ancestry.forEach(function(p){
	byName[p.name] = p;
});


//to compute average difference between mothers and children, we must have an array in which only persons with known mothers are present

var hasMother = ancestry.filter(function(p){
	return byName[p.mother] != undefined;
});

//function to compute mother's age

function momAge(p){
	var age = p.born - byName[p.mother].born;
	return age;
}

//compute average mother-child age difference by mapping each born year difference in the elements of the hasMother array, and then using 
//it as argument to the average function

average(hasMother.map(momAge));
//31.22222222222222

console.log("The average age-difference between mothers and children in the ancestry data is "+Math.round(average(hasMother.map(momAge)))+" years");
//The average age-difference between mothers and children in the ancestry data is 31 years
//===========================================================================================

/* 3. When we looked up all the people in our data set that lived more than 90 years, only the latest generation in the data came out. Let’s take a closer look at that phenomenon.

Compute and output the average age of the people in the ancestry data set per century. A person is assigned to a century by taking their year of death, dividing it by 100, and rounding it up, as in Math.ceil(person.died / 100).
*/

//function to generate list of those people in the data who lived in the specified century, will take in the data array and a 
//an integer indicating the century as arguments and will output an array of person objects who fall into the category

function inCentury(data,century){
	return data.filter(function(p){
		return Math.ceil(p.died/100) == century;
	});
}

//test the function for people in certain centuries:

inCentury(ancestry,17);
/*
(5) [{…}, {…}, {…}, {…}, {…}]
0
:
{name: "Pieter Haverbeke", sex: "m", born: 1602, died: 1642, father: "Lieven van Haverbeke", …}
1
:
{name: "Lieven van Haverbeke", sex: "m", born: 1570, died: 1636, father: "Pauwels van Haverbeke", …}
2
:
{name: "Lieven Haverbeke", sex: "m", born: 1631, died: 1676, father: "Pieter Haverbeke", …}
3
:
{name: "Elisabeth Hercke", sex: "f", born: 1632, died: 1674, father: "Willem Hercke", …}
4
:
{name: "Anna van Hecke", sex: "f", born: 1607, died: 1670, father: "Paschasius van Hecke", …}
length
:
5
__proto__
:
Array(0)
*/

//compute average lifespan per century:

average(inCentury(ancestry,16).map(age)); // 43.5
average(inCentury(ancestry,17).map(age)); // 51.2
average(inCentury(ancestry,18).map(age)); // 52.79
average(inCentury(ancestry,19).map(age)); // 54.83
average(inCentury(ancestry,20).map(age)); // 84.67
average(inCentury(ancestry,21).map(age)); // 94 -- only one data

/*
For bonus points, write a function groupBy that abstracts the grouping operation. It should accept as arguments an array and a function that computes the group for an element in the array and returns an object that maps group names to arrays of group members.
*/

//i added another argument cat in order to use groupBy for all types of categorization. Here we can use groupBy
//to categorize people living in which centuries as well as male and female 

function groupBy(arr,cat,f){
	var obj = {};
	cat.forEach(function(el){
		if(typeof el == "function") obj[el.name] = f(arr,el);
		else obj[el] = f(arr,el);
	});
	return obj;
}

var genders = [male,female];
var centuries = [16,17,18,19,20,21];

groupBy(ancestry,centuries,inCentury);

/*
{16: Array(2), 17: Array(5), 18: Array(19), 19: Array(6), 20: Array(6), 21: Array(1)}
16:Array(2)
0:{name: "Pauwels van Haverbeke", sex: "m", born: 1535, died: 1582, father: "N. van Haverbeke", …}
1:
{name: "Lievijne Jans", sex: "f", born: 1542, died: 1582, father: null, …}
length:2
etc.......
*/

//to be able to categorize by genders, function inSex is created, which generates an array of persons objects for a 
//specified gender. this takes in an array and the male or female function as arguments

function inSex(arr,s){
	return arr.filter(s);
}

//test to generate all males

inSex(ancestry,male);

/*
0:{name: "Carolus Haverbeke", sex: "m", born: 1832, died: 1905, father: "Carel Haverbeke", …}
1:{name: "Jan van Brussel", sex: "m", born: 1714, died: 1748, father: "Jacobus van Brussel", …}
2:{name: "Philibert Haverbeke", sex: "m", born: 1907, died: 1997, father: "Emile Haverbeke", …}
3:{name: "Jan Frans van Brussel", sex: "m", born: 1761, died: 1833, father: "Jacobus Bernardus van Brussel", …}
4:{name: "Pauwels van Haverbeke", sex: "m", born: 1535, died: 1582, father: "N. van Haverbeke", …}
5:{name: "Emile Haverbeke", sex: "m", born: 1877, died: 1968, father: "Carolus Haverbeke", …}
6:{name: "Lieven de Causmaecker", sex: "m", born: 1696, died: 1724, father: "Carel de Causmaecker", …}
7:{name: "Pieter Haverbeke", sex: "m", born: 1602, died: 1642, father: "Lieven van Haverbeke", …}
8:{name: "Pieter Bernard Haverbeke", sex: "m", born: 1695, died: 1762, father: "Willem Haverbeke", …}
9:{name: "Lieven van Haverbeke", sex: "m", born: 1570, died: 1636, father: "Pauwels van Haverbeke", …}
10:{name: "Willem Haverbeke", sex: "m", born: 1668, died: 1731, father: "Lieven Haverbeke", …}
11:{name: "Pieter Antone Haverbeke", sex: "m", born: 1753, died: 1798, father: "Jan Francies Haverbeke", …}
12:{name: "Bernardus de Causmaecker", sex: "m", born: 1721, died: 1789, father: "Lieven de Causmaecker", …}
13:{name: "Pieter de Decker", sex: "m", born: 1705, died: 1780, father: "Joos de Decker", …}
14:{name: "Daniel Haverbeke", sex: "m", born: 1652, died: 1723, father: "Lieven Haverbeke", …}
15:{name: "Lieven Haverbeke", sex: "m", born: 1631, died: 1676, father: "Pieter Haverbeke", …}
16:{name: "Jan Francies Haverbeke", sex: "m", born: 1725, died: 1779, father: "Pieter Bernard Haverbeke", …}
17:{name: "Maria Haverbeke", sex: "m", born: 1905, died: 1997, father: "Emile Haverbeke", …}
18:{name: "Carel Haverbeke", sex: "m", born: 1796, died: 1837, father: "Pieter Antone Haverbeke", …}
19:{name: "Jan Haverbeke", sex: "m", born: 1671, died: 1731, father: "Lieven Haverbeke", …}
20:{name: "Jacobus Bernardus van Brussel", sex: "m", born: 1736, died: 1809, father: "Jan van Brussel", …}
*/

groupBy(ancestry,genders,inSex);

/*
{male: Array(21), female: Array(18)}
female:Array(18)
0:{name: "Emma de Milliano", sex: "f", born: 1876, died: 1956, father: "Petrus de Milliano", …}
1:{name: "Maria de Rycke", sex: "f", born: 1683, died: 1724, father: "Frederik de Rycke", …}
2:{name: "Clara Aernoudts", sex: "f", born: 1918, died: 2012, father: "Henry Aernoudts", …}
3:{name: "Livina Haverbeke", sex: "f", born: 1692, died: 1743, father: "Daniel Haverbeke", …}
4:{name: "Joanna de Causmaecker", sex: "f", born: 1762, died: 1807, father: "Bernardus de Causmaecker", …}
5:{name: "Maria van Brussel", sex: "f", born: 1801, died: 1834, father: "Jan Frans van Brussel", …}
6:{name: "Angela Haverbeke", sex: "f", born: 1728, died: 1734, father: "Pieter Bernard Haverbeke", …}
7:{name: "Elisabeth Haverbeke", sex: "f", born: 1711, died: 1754, father: "Jan Haverbeke", …}
8:{name: "Lievijne Jans", sex: "f", born: 1542, died: 1582, father: null, …}
9:{name: "Jacoba Lammens", sex: "f", born: 1699, died: 1740, father: "Lieven Lammens", …}
10:{name: "Joanna de Pape", sex: "f", born: 1654, died: 1723, father: "Vincent de Pape", …}
11:{name: "Martina de Pape", sex: "f", born: 1666, died: 1727, father: "Vincent de Pape", …}
12:{name: "Petronella de Decker", sex: "f", born: 1731, died: 1781, father: "Pieter de Decker", …}
13:{name: "Livina Sierens", sex: "f", born: 1761, died: 1826, father: "Jan Sierens", …}
14:{name: "Laurentia Haverbeke", sex: "f", born: 1710, died: 1786, father: "Jan Haverbeke", …}
15:{name: "Elisabeth Hercke", sex: "f", born: 1632, died: 1674, father: "Willem Hercke", …}
16:{name: "Anna van Hecke", sex: "f", born: 1607, died: 1670, father: "Paschasius van Hecke", …}
17:{name: "Maria Sturm", sex: "f", born: 1835, died: 1917, father: "Charles Sturm", …}
length:18
... etc for male
*/

