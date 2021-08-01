function Limb(singular, plural, enabled) {
	this.singular = singular;
	this.plural = plural;
	this.enabled = enabled;
}

function defaultLimbs() {
	return [
		new Limb("Fuß" , "Füße" , true),
		new Limb("Hand", "Hände", true),
		new Limb("Kopf", "Köpfe", true),
	]
}

function show(id) {
	document.getElementById(id).style.display = "block";
}

function hide(id) {
	document.getElementById(id).style.display = "none";
}

function hideElement(element) {
	element.style.display = "none";
}

function showOnly(id) {
	document.querySelectorAll(".screen").forEach(hideElement);
	show(id);
}

function configButton() {
	//updateColorsTable();
	showOnly('config-screen');
}

function okButton() {
	showOnly('play-screen');
}

//loadColors(); // TODO do this window.onload
//

var limbCount = 4;

var limbCountElement = document.getElementById('limb-count');
var taskElement      = document.getElementById('task');

// TODO local storage for limb count

function updateLimbCount()   { limbCountElement.textContent = limbCount + " Körperteile"; }
function increaseLimbCount() { limbCount = limbCount + 1; updateLimbCount(); }
function decreaseLimbCount() { limbCount = Math.max(limbCount - 1, 0); updateLimbCount(); }

function randomChoice(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function chooseLimbs(limbs, count) {
    var result = [];
    for (var i = 0; i < count; i++) {
        result.push(randomChoice(limbs));
    }
    return result;
}

function count(values) {
    const result = {}

    for (const value of values) {
        var id = value.singular;
        result[id] = result[id] ? result[id] + 1 : 1;
    }

    return result;
}

function formatTask(limbs, limbCount) {
    var table = document.createElement("table");
    table.className = "task";

    for (var limb of limbs) {
        var count = limbCount[limb.singular];

        if (count > 0) {
            var row = document.createElement("tr");

            var countCell = document.createElement("td");
            countCell.className = "count";
            countCell.textContent=count;
            row.append(countCell);

            var limbCell = document.createElement("td");
            limbCell.className = "limb";
            if (count == 1) {
                limbCell.textContent=limb.singular;
            } else {
                limbCell.textContent=limb.plural;
            }
            row.append(limbCell);

            table.append(row);
        }
    }

    return table;
}

function generateTask() {
    //var limbs = ["foot", "hand", "head"];
    var limbs = defaultLimbs();
    var taskLimbs = chooseLimbs(limbs, limbCount);
    var countByLimb = count(taskLimbs);

    taskElement.innerHTML = "";
    taskElement.appendChild(formatTask(limbs, countByLimb));
}

document.getElementById('limb-plus'    ).addEventListener('click', increaseLimbCount);
document.getElementById('limb-minus'   ).addEventListener('click', decreaseLimbCount);
document.getElementById('generate-task').addEventListener('click', generateTask);
document.getElementById("config-button").addEventListener('click', configButton);
document.getElementById("ok-button"    ).addEventListener('click', okButton);

updateLimbCount();
generateTask();




showOnly("play-screen");

