const roundAccurately = (number, decimalPlaces) => Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces);
const average = arr => arr.reduce((acc,v) => acc + v) / arr.length;

var bahan_hitung = {"proker" : [{
  "namaproker" : "",
  "jumlah_pelaksanaan" : 1,
  "aspek_nilai" : {
    "sesuai_rencana" : {
      "deskripsi_program" : [{"deskripsi" : "", "terlaksana" : [false]}]
    },

    "sesuai_tujuansasaran" : {
      "tujuan" : [{"deskripsi" : "", "terlaksana" : [false]}],
      "sasaran" : [{"deskripsi" : "", "terlaksana" : [false]}]
    },

    "sesuai_waktutempat" : {
      "waktu" : {
        "tanggal" : [{"opsi" : 0, "persen" : 0}],
        "jam" : [{"opsi" : 0, "persen" : 0}]
      },
      "tempat" : [{"namatempat" : "", "sesuai" : [false]}]
    },

    "sesuai_parameter" : {
      "parameter" : [{"realisasi" : [0], "estimasi" : 0, "satuan" : ""}]
    },

    "efisiensi_dana" : {
      "estimasi_dana" : 0,
      "realisasi_dana" : [0],
      "skala_penurunan" : 4
    }
  },
  "total_persentase" : 0
}]}

var proker_tunggal = {
  "namaproker" : "",
  "jumlah_pelaksanaan" : 1,
  "aspek_nilai" : [{
    "sesuai_rencana" : {
      "deskripsi_program" : [{"deskripsi" : "", "terlaksana" : false}]
    },

    "sesuai_tujuansasaran" : {
      "tujuan" : [{"deskripsi" : "", "terlaksana" : false}],
      "sasaran" : [{"deskripsi" : "", "terlaksana" : false}]
    },

    "sesuai_waktutempat" : {
      "waktu" : {
        "tanggal" : {"opsi" : 0, "persen" : 0},
        "jam" : {"opsi" : 0, "persen" : 0}
      },
      "tempat" : [{"namatempat" : 0, "sesuai" : false}]
    },

    "sesuai_parameter" : {
      "parameter" : [{"realisasi" : 0, "estimasi" : 0, "satuan" : ""}]
    },

    "efisiensi_dana" : {
      "estimasi_dana" : 0,
      "realisasi_dana" : [0],
      "skala_penurunan" : 4
    }
  }],
  "total_persentase" : 0
}

function hitung_sesuai_rencana(urutan){
  var rencana = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"];
  count = 0;
  rencana.forEach((item, i) => {
    if(item["terlaksana"]){
      count += 1;
    }
  });

  jumlah_terlaksana = count;
  jumlah_rencana = rencana.length;

  hasil = jumlah_terlaksana/jumlah_rencana;
  return roundAccurately(hasil*100, 2);
}

function hitung_sesuai_tujuan(urutan){
  var tujuan = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["tujuan"];
  count = 0;
  tujuan.forEach((item, i) => {
    if(item["terlaksana"]){
      count += 1;
    }
  });

  jumlah_terlaksana = count;
  jumlah_tujuan = tujuan.length;

  hasil = jumlah_terlaksana/jumlah_tujuan;
  return roundAccurately(hasil*100, 2);
}

function hitung_sesuai_sasaran(urutan){
  var sasaran = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["sasaran"];
  count = 0;
  sasaran.forEach((item, i) => {
    if(item["terlaksana"]){
      count += 1;
    }
  });

  jumlah_terlaksana = count;
  // console.log(count);
  jumlah_sasaran = sasaran.length;

  hasil = jumlah_terlaksana/jumlah_sasaran;
  return roundAccurately(hasil*100, 2);
}

function hitung_sesuai_waktutempat(urutan){
  var tanggal = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["tanggal"]["persen"];
  var jam = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["jam"]["persen"];
  // var tempat = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["tempat"]["persen"];
  var tempat = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["tempat"];
  count = 0;
  tempat.forEach((item, i) => {
    if(item["sesuai"]){
      count += 1;
    }
  });

  jumlah_tempat = tempat.length;
  jumlah_sesuai = count;
  jumlah_tidaksesuai = jumlah_tempat - count;

  hasil_sesuai = jumlah_sesuai/jumlah_tempat;
  hasil_tidaksesuai = jumlah_tidaksesuai/jumlah_tempat;
  var nilaitempat = roundAccurately(hasil_sesuai*50, 2) + roundAccurately(hasil_tidaksesuai*25, 2);

  tanggal = parseFloat(tanggal);
  jam = parseFloat(jam);
  // tempat = parseFloat(tempat);
  // console.log(tanggal, jam, nilaitempat);
  return [tanggal, jam, nilaitempat];
}

function hitung_sesuai_parameter(urutan){
  var rencana = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_parameter"]["parameter"];
  var hasil = [];

  rencana.forEach((item, i) => {
    var realisasi = parseFloat(item["realisasi"]);
    var estimasi = parseFloat(item["estimasi"]);

    if(realisasi >= estimasi){
      hasil.push(100);
    } else {
      hasil.push(roundAccurately((realisasi / estimasi)*100, 2));
    }
  });

  rata_hasil = average(hasil);
  return [roundAccurately(rata_hasil, 2), hasil];
}

function hitung_estimasi_dana(urutan, esti, real, scale){
  esti = esti;
  real = real;
  scale = scale;

  percent = real / esti;

  result = 0;
  if (real < esti){
    result = percent;

  } else if (real > esti) {
      diff = percent - 1;
      result = 1 - diff*scale;

      if (result < 0 || result == 0) {
        result = 0;
      }

  } else {
    result = 1;
  }

  return roundAccurately(result*100, 2);
}

function tambah_proker(){
  // get parent node first
  var parent = document.querySelector("article.proker");
  var blueprint_element = parent.lastElementChild;

  // find the number of latest node and json
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(blueprint_element.id)[1];
  number = parseFloat(number) + 1;
  // console.log(number);

  var proker = bahan_hitung["proker"];
  // console.log(typeof proker);
  proker.push(proker_tunggal);

  // create new duplicated node
  var new_element = document.createElement("div")
  new_element.setAttribute("id", "proker_" + (number));
  new_element.innerHTML = blueprint_element.innerHTML;

  new_element.querySelector("span[id='nomorproker']").innerHTML = number;
  new_element.querySelector("button[name='tambah_deskripsi']").setAttribute("onclick", "tambah_deskripsi("+ (number) +"), refreshValue()");
  new_element.querySelector("button[name='tambah_tujuan']").setAttribute("onclick", "tambah_tujuan("+ (number) +"), refreshValue()");
  new_element.querySelector("button[name='tambah_sasaran']").setAttribute("onclick", "tambah_sasaran("+ (number) +"), refreshValue()");
  new_element.querySelector("button[name='tambah_tempat']").setAttribute("onclick", "tambah_tempat("+ (number) +"), refreshValue()");
  new_element.querySelector("button[name='tambah_parameter']").setAttribute("onclick", "tambah_parameter("+ (number) +"), refreshValue()");

  new_element.querySelector("button[name='kurang_deskripsi']").setAttribute("onclick", "kurang_deskripsi("+ (number) +"), refreshValue()");
  new_element.querySelector("button[name='kurang_tujuan']").setAttribute("onclick", "kurang_tujuan("+ (number) +"), refreshValue()");
  new_element.querySelector("button[name='kurang_sasaran']").setAttribute("onclick", "kurang_sasaran("+ (number) +"), refreshValue()");
  new_element.querySelector("button[name='kurang_tempat']").setAttribute("onclick", "kurang_tempat("+ (number) +"), refreshValue()");
  new_element.querySelector("button[name='kurang_parameter']").setAttribute("onclick", "kurang_parameter("+ (number) +"), refreshValue()");

  // append new node to parent
  parent.appendChild(new_element);
}

function kurang_proker(){
  // get parent node first
  var parent = document.querySelector("article.proker");
  var to_remove = parent.lastElementChild;

  // find the latest number of node
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(to_remove.id)[1];

  // to prevent of losing last node
  if (number == 1){
    return console.log("Cannot remove this node, this is the last node!");
  }

  // remove node and json element
  var proker = bahan_hitung["proker"]
  proker.pop();

  to_remove.remove();
}

function tambah_pelaksanaan(nomorproker) {
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");

  var direncanakan = parseInt(bahan_hitung["proker"][0]["jumlah_pelaksanaan"]);

  var wadah_deskripsi = parent.querySelector("div[class='deskripsi']");
  var wadah_tujuan = parent.querySelector("div[class='tujuan']");
  var wadah_sasaran = parent.querySelector("div[class='sasaran']");
  var wadah_tanggal = parent.querySelector("div[class='tanggal']");
  var wadah_jam = parent.querySelector("div[class='jam']");
  var wadah_tempat = parent.querySelector("div[class='tempat']");
  var wadah_parameter = parent.querySelector("div[class='parameter']");
  var wadah_akurasi = parent.querySelector("div[class='akurasi']");

  var clone_deskripsi = wadah_deskripsi.querySelector("input[name='terlaksana']").cloneNode(true);
  var clone_tujuan = wadah_tujuan.querySelector("input[name='terlaksana']").cloneNode(true);
  var clone_sasaran = wadah_sasaran.querySelector("input[name='terlaksana']").cloneNode(true);
  var clone_tanggal = wadah_tanggal.querySelector("div[class='choices']").cloneNode(true);
  var clone_jam = wadah_jam.querySelector("div[class='choices']").cloneNode(true);

  var list_tanggal = clone_tanggal.querySelectorAll("input[name='tanggal_1']");

  list_tanggal.forEach((item, i) => {
    item.setAttribute("name", "tanggal_"+ (direncanakan + 1) +"");
  });

  var list_jam = clone_jam.querySelectorAll("input[name='jam_1']");

  list_jam.forEach((item, i) => {
    item.setAttribute("name", "jam_"+ (direncanakan + 1) +"");
  });

  var clone_tempat= wadah_tempat.querySelector("input[name='terlaksana']").cloneNode(true);
  var clone_parameter= wadah_parameter.querySelector("input[name='terlaksana']").cloneNode(true);
  var clone_akurasi= wadah_akurasi.querySelector("input[name='realization']").cloneNode(true);

  wadah_deskripsi.appendChild(clone_deskripsi);
  wadah_tujuan.appendChild(clone_tujuan);
  wadah_sasaran.appendChild(clone_sasaran);
  wadah_tanggal.appendChild(clone_tanggal);
  wadah_jam.appendChild(clone_jam);
  wadah_tempat.appendChild(clone_tempat);
  wadah_parameter.appendChild(clone_parameter);
  wadah_akurasi.appendChild(clone_akurasi);


  bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"][0]["terlaksana"].push(false);
  bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["tujuan"][0]["terlaksana"].push(false);
  bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["sasaran"][0]["terlaksana"].push(false);
  bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["tempat"][0]["sesuai"].push(false);
  bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_parameter"]["parameter"][0]["realisasi"].push(0);
  bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["tanggal"].push({"opsi": 0, "persen": 0});
  bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["jam"].push({"opsi": 0, "persen": 0});
  bahan_hitung["proker"][0]["aspek_nilai"]["efisiensi_dana"]["realisasi_dana"].push(0);

  direncanakan += 1;
}

function kurang_pelaksanaan(nomorproker) {
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");
  var wadah_deskripsi = parent.querySelector("div[class='deskripsi']");
  var wadah_tujuan = parent.querySelector("div[class='tujuan']");
  var wadah_sasaran = parent.querySelector("div[class='sasaran']");
  var wadah_tanggal = parent.querySelector("div[class='tanggal']");
  var wadah_jam = parent.querySelector("div[class='jam']");
  var wadah_tempat = parent.querySelector("div[class='tempat']");
  var wadah_parameter = parent.querySelector("div[class='parameter']");
  var wadah_akurasi = parent.querySelector("div[class='akurasi']");

  if (wadah_deskripsi.parentNode && wadah_deskripsi.childElementCount != 1) {
    wadah_deskripsi.removeChild(wadah_deskripsi.lastElementChild);
    wadah_tujuan.removeChild(wadah_tujuan.lastElementChild);
    wadah_sasaran.removeChild(wadah_sasaran.lastElementChild);
    wadah_tanggal.removeChild(wadah_tanggal.lastElementChild);
    wadah_jam.removeChild(wadah_jam.lastElementChild);
    wadah_tempat.removeChild(wadah_tempat.lastElementChild);
    wadah_parameter.removeChild(wadah_parameter.lastElementChild);
    wadah_akurasi.removeChild(wadah_akurasi.lastElementChild);

    bahan_hitung["proker"][0]["jumlah_pelaksanaan"] -= 1;

    bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"][0]["terlaksana"].pop();
    bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["tujuan"][0]["terlaksana"].pop();
    bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["sasaran"][0]["terlaksana"].pop();
    bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["tanggal"].pop();
    bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["jam"].pop();
    bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["tempat"][0]["sesuai"].pop();
    bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_parameter"]["parameter"][0]["realisasi"].pop();
    bahan_hitung["proker"][0]["aspek_nilai"]["efisiensi_dana"]["realisasi_dana"].pop();
  } else {
    console.log("Cannot remove the only one child");
  }

}

function tambah_deskripsi(nomorproker){
  // get parent node first
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");
  var child = parent.querySelector("div.rencana div.unsur");
  var blueprint_element = child.lastElementChild;

  // find the number of latest node and json
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(blueprint_element.id)[1];
  number = parseFloat(number) + 1;

  var deskripsi = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"]
  deskripsi.push(deskripsi[0]);

  // create new duplicated node
  var new_element = document.createElement("div")
  new_element.setAttribute("id", "deskripsi_" + (number));
  new_element.innerHTML = blueprint_element.innerHTML;

  // append new node to parent
  child.appendChild(new_element);
}

function kurang_deskripsi(nomorproker){
  // get parent node first
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");
  var child = parent.querySelector("div.rencana div.unsur");
  var to_remove = child.lastElementChild;

  // find the latest number of node
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(to_remove.id)[1];

  // to prevent of losing last node
  if (number == 1){
    return console.log("Cannot remove this node, this is the last node!");
  }

  // remove node and json element
  var deskripsi = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"]
  deskripsi.pop();

  to_remove.remove();
}

function tambah_tujuan(nomorproker){
  // get parent node first
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");
  var child = parent.querySelector("div.tujuansasaran div.tujuan");
  var blueprint_element = child.lastElementChild;

  // find the number of latest node and json
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(blueprint_element.id)[1];
  number = parseFloat(number) + 1;

  var tujuan = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["tujuan"]
  tujuan.push(tujuan[0]);

  // create new duplicated node
  var new_element = document.createElement("div")
  new_element.setAttribute("id", "tujuan_" + (number));
  new_element.innerHTML = blueprint_element.innerHTML;

  // append new node to parent
  child.appendChild(new_element);
}

function kurang_tujuan(nomorproker){
  // get parent node first
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");
  var child = parent.querySelector("div.tujuansasaran div.tujuan");
  var to_remove = child.lastElementChild;

  // find the latest number of node
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(to_remove.id)[1];

  // to prevent of losing last node
  if (number == 1){
    return console.log("Cannot remove this node, this is the last node!");
  }

  // remove node and json element
  var tujuan = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["tujuan"]
  tujuan.pop();

  to_remove.remove();
}

function tambah_sasaran(nomorproker){
  // get parent node first
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");
  var child = parent.querySelector("div.tujuansasaran div.sasaran");
  var blueprint_element = child.lastElementChild;

  // find the number of latest node and json
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(blueprint_element.id)[1];
  number = parseFloat(number) + 1;

  var sasaran = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["sasaran"]
  sasaran.push(sasaran[0]);

  // create new duplicated node
  var new_element = document.createElement("div")
  new_element.setAttribute("id", "sasaran_" + (number));
  new_element.innerHTML = blueprint_element.innerHTML;

  // append new node to parent
  child.appendChild(new_element);
  // console.log(sasaran);
  // console.log(number);
  // console.log(new_element);
}

function kurang_sasaran(nomorproker){
  // get parent node first
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");
  var child = parent.querySelector("div.tujuansasaran div.sasaran");
  var to_remove = child.lastElementChild;

  // find the latest number of node
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(to_remove.id)[1];

  // to prevent of losing last node
  if (number == 1){
    return console.log("Cannot remove this node, this is the last node!");
  }

  // remove node and json element
  var sasaran = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["sasaran"]
  sasaran.pop();

  to_remove.remove();
}

function tambah_tempat(nomorproker){
  // get parent node first
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");
  var child = parent.querySelector("div.waktutempat div.tempat");
  var blueprint_element = child.lastElementChild;

  // find the number of latest node and json
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(blueprint_element.id)[1];
  number = parseFloat(number) + 1;

  var tempat = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["tempat"]
  tempat.push(tempat[0]);

  // create new duplicated node
  var new_element = document.createElement("div")
  new_element.setAttribute("id", "tempat_" + (number));
  new_element.innerHTML = blueprint_element.innerHTML;

  // append new node to parent
  child.appendChild(new_element);
}

function kurang_tempat(nomorproker){
  // get parent node first
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");
  var child = parent.querySelector("div.waktutempat div.tempat");
  var to_remove = child.lastElementChild;

  // find the latest number of node
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(to_remove.id)[1];

  // to prevent of losing last node
  if (number == 1){
    return console.log("Cannot remove this node, this is the last node!");
  }

  // remove node and json element
  var tempat = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["tempat"]
  tempat.pop();

  to_remove.remove();
}

function tambah_parameter(nomorproker){
  // get parent node first
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");
  var child = parent.querySelector("div.parameter div.unsur");
  var blueprint_element = child.lastElementChild;

  // find the number of latest node and json
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(blueprint_element.id)[1];
  number = parseFloat(number) + 1;

  var parameter = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_parameter"]["parameter"]
  parameter.push(parameter[0]);

  // create new duplicated node
  var new_element = document.createElement("div");
  new_element.setAttribute("id", "parameter_" + (number));
  new_element.innerHTML = blueprint_element.innerHTML;

  // append new node to parent
  child.appendChild(new_element);
  // console.log(deskripsi);
  // console.log(number);
  // console.log(new_element);
}

function kurang_parameter(nomorproker){
  // get parent node first
  var parent = document.querySelector("article.proker div[id='proker_"+ nomorproker +"']");
  var child = parent.querySelector("div.parameter div.unsur");
  var to_remove = child.lastElementChild;

  // find the latest number of node
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(to_remove.id)[1];

  // to prevent of losing last node
  if (number == 1){
    return console.log("Cannot remove this node, this is the last node!");
  }

  // remove node and json element
  var parameter = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_parameter"]["parameter"]
  parameter.pop();

  to_remove.remove();
}

function refreshValue(){
  var pelaksanaan = parseInt(bahan_hitung["proker"][0]["jumlah_pelaksanaan"]);
  document.querySelector("p[id='jumlah_pelaksanaan']").innerHTML = pelaksanaan;

  bahan_hitung["proker"][0]["namaproker"] = document.getElementById('proker1').value;

  // 0. Jumlah Pelaksanaan
  var parent = document.querySelector("article.proker div[id='proker_"+ 1 +"']");
  var child = parent.querySelector("p[id='jumlah_pelaksanaan']");
  child.innerHTML = bahan_hitung["proker"][0]["jumlah_pelaksanaan"];

  // 1. Kesesuaian Rencana
  var parent = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"];

  parent.forEach((item, i) => {
    var list_terlaksana = document.querySelectorAll("#deskripsi_" + parseFloat(i+1) + " input[type='checkbox']");
    var item_terlaksana = []
    list_terlaksana.forEach((list, j) => {
      item_terlaksana[j] = list.checked;
    });
    var item_deskripsi = document.querySelector("#deskripsi_" + parseFloat(i+1) + " input[type='text']").value

    parent[i] = {"deskripsi" : item_deskripsi, "terlaksana" : item_terlaksana};
  })

  // 2. Kesesuaian Tujuan dan Sasaran
  var parent = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["tujuan"];
  parent.forEach((item, i) => {
    var list_terlaksana = document.querySelectorAll("#tujuan_" + parseFloat(i+1) + " input[type='checkbox']");
    var item_terlaksana = []
    list_terlaksana.forEach((list, j) => {
      item_terlaksana[j] = list.checked;
    });

    var item_deskripsi = document.querySelector("#tujuan_" + parseFloat(i+1) + " input[type='text']").value
    // parent[i] = {"deskripsi" : i};
    parent[i] = {"deskripsi" : item_deskripsi, "terlaksana" : item_terlaksana};
  })

  // parent.forEach((item, i) => {
  //   item["deskripsi"] = document.querySelector("#tujuan_" + parseFloat(i+1) + " input[type='text']").value;
  //   item["terlaksana"] = document.querySelector("#tujuan_" + parseFloat(i+1) + " input[type='checkbox']").checked;
  // });

  var parent = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_tujuansasaran"]["sasaran"];
  parent.forEach((item, i) => {
    var list_terlaksana = document.querySelectorAll("#sasaran_" + parseFloat(i+1) + " input[type='checkbox']");
    var item_terlaksana = []
    list_terlaksana.forEach((list, j) => {
      item_terlaksana[j] = list.checked;
    });

    var item_deskripsi = document.querySelector("#sasaran_" + parseFloat(i+1) + " input[type='text']").value
    // parent[i] = {"deskripsi" : i};
    parent[i] = {"deskripsi" : item_deskripsi, "terlaksana" : item_terlaksana};
  })

  // 3. Kesesuaian waktu dan tempat
  var parent = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["tanggal"];

  // 3. tanggal
  parent.forEach((item, i) => {
    var list_tanggal = document.querySelectorAll("input[name^='tanggal_"+ (i+1) +"']");
    var list_id = [];
    var list_value = [];

    list_tanggal.forEach((item, i) => {
      if (item.checked){
        list_id[i] = item.id;
        list_value[i] = item.value;
      }
    });

    var filtered_id = list_id.filter(function (el) {return el != null});
    var filtered_value = list_value.filter(function (el) {return el != null});

    parent[i] = {"opsi" : filtered_id[0], "persen" : filtered_value[0]};
  })

  var parent = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["jam"];

  // 3. jam
  parent.forEach((item, i) => {
    var list_jam = document.querySelectorAll("input[name^='jam_"+ (i+1) +"']");
    var list_id = [];
    var list_value = [];

    list_jam.forEach((item, i) => {
      if (item.checked){
        list_id[i] = item.id;
        list_value[i] = item.value;
      }
    });

    var filtered_id = list_id.filter(function (el) {return el != null});
    var filtered_value = list_value.filter(function (el) {return el != null});

    parent[i] = {"opsi" : filtered_id[0], "persen" : filtered_value[0]};
  })

  // 3. tempat
  var parent = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_waktutempat"]["tempat"];
  parent.forEach((item, i) => {
    var list_terlaksana = document.querySelectorAll("#tempat_" + parseFloat(i+1) + " input[type='checkbox']");
    var item_terlaksana = []
    list_terlaksana.forEach((list, j) => {
      item_terlaksana[j] = list.checked;
    });
    var item_deskripsi = document.querySelector("#tempat_" + parseFloat(i+1) + " input[type='text']").value

    parent[i] = {"namatempat" : item_deskripsi, "sesuai" : item_terlaksana};
  })

  // 4. Kesesuaian Parameter Keberhasilan
  var parent = bahan_hitung["proker"][0]["aspek_nilai"]["sesuai_parameter"]["parameter"];

  parent.forEach((item, i) => {
    var list_realisasi = document.querySelectorAll("#parameter_" + parseFloat(i+1) + " input[id='realisasi_parameter']");
    var item_realisasi = [];
    list_realisasi.forEach((list, j) => {
      item_realisasi[j] = list.value;
    });
    var item_estimasi = document.querySelector("#parameter_" + parseFloat(i+1) + " input[id='estimasi_parameter']").value;
    var item_satuan = document.querySelector("#parameter_" + parseFloat(i+1) + " input[type='text']").value;

    parent[i] = {"realisasi" : item_realisasi, "estimasi" : item_estimasi, "satuan" : item_satuan};
  })

  // 5. Efisiensi Dana
  // var persen_estimasi_dana = bahan_hitung["proker"][0]["aspek_nilai"]["efisiensi_dana"]["persentase"];
  // var parent = bahan_hitung["proker"][0]["aspek_nilai"]["efisiensi_dana"];
  var parent = bahan_hitung["proker"][0]["aspek_nilai"];

  var list_realisasi_dana = document.querySelectorAll("div.efisiensi_dana input[id='realisasi_dana']");
  var item_realisasi_dana = [];
  list_realisasi_dana.forEach((list, j) => {
    item_realisasi_dana[j] = list.value;
  });

  console.log(item_realisasi_dana);
  // console.log(item_realisasi);
  var item_estimasi = document.querySelector("div.efisiensi_dana input[id='estimasi_dana']").value;
  var item_skalaturun = document.querySelector("div.efisiensi_dana input[id='skala_penurunan']").placeholder;

  var esti = item_estimasi;
  var real = item_realisasi_dana;
  var scale = item_skalaturun;

  parent["efisiensi_dana"] = {"estimasi_dana" : item_estimasi, "realisasi_dana" : item_realisasi_dana, "skala_penurunan" : item_skalaturun};

  // Rekap semua total_persentase
  // 1.
  var persen_sesuai_rencana = hitung_sesuai_rencana(0);
  document.querySelector("span[id='sesuai_rencana']").innerHTML = persen_sesuai_rencana;

  // 2a.
  var persen_sesuai_tujuan = hitung_sesuai_tujuan(0);
  document.querySelector("span[id='sesuai_tujuan']").innerHTML = persen_sesuai_tujuan/2;

  // 2b.
  var persen_sesuai_sasaran = hitung_sesuai_sasaran(0);
  document.querySelector("span[id='sesuai_sasaran']").innerHTML = persen_sesuai_sasaran/2;

  // 2.
  var persen_sesuai_tujuansasaran = (persen_sesuai_tujuan + persen_sesuai_sasaran) / 2;
  document.querySelector("span[id='sesuai_tujuansasaran']").innerHTML = roundAccurately(persen_sesuai_tujuansasaran, 2);

  // 3.
  var persen_sesuai_waktutempat = hitung_sesuai_waktutempat(0);
  document.querySelector("span[id='sesuai_waktutempat']").innerHTML = persen_sesuai_waktutempat[0] + persen_sesuai_waktutempat[1] + persen_sesuai_waktutempat[2];
  document.querySelector("span[id='sesuai_waktu']").innerHTML = persen_sesuai_waktutempat[0] + persen_sesuai_waktutempat[1];
  document.querySelector("span[id='sesuai_tanggal']").innerHTML = persen_sesuai_waktutempat[0];
  document.querySelector("span[id='sesuai_jam']").innerHTML = persen_sesuai_waktutempat[1];
  document.querySelector("span[id='sesuai_tempat']").innerHTML = persen_sesuai_waktutempat[2];

  // 4.
  var persen_sesuai_parameter = hitung_sesuai_parameter(0);
  if (isNaN(persen_sesuai_parameter[0]) == true){
    persen_sesuai_parameter[0] = 0;
  }
  document.querySelector("span[id='sesuai_parameter']").innerHTML = persen_sesuai_parameter[0];

  var parameters = document.querySelectorAll('[id^=parameter_] span');
  parameters.forEach((item, i) => {
    item.innerHTML = persen_sesuai_parameter[1][i];
  });

  // 5.
  var persen_estimasi_dana = hitung_estimasi_dana(0, esti, real, scale);
  document.querySelector("span[id='efisiensi_dana']").innerHTML = persen_estimasi_dana;

  // final per proker
  var persen_proker = ((20/100)*(persen_sesuai_rencana) +
                      (25/100)*(persen_sesuai_tujuansasaran) +
                      (15/100)*(persen_sesuai_waktutempat[0] + persen_sesuai_waktutempat[1] + persen_sesuai_waktutempat[2]) +
                      (30/100)*(persen_sesuai_parameter[0]) +
                      (10/100)*(persen_estimasi_dana));

  roundAccurately(persen_proker, 1);

  // nama dan nomor program kerja
  // document.querySelector("span[id='nomorproker']").innerHTML = 1;
  document.querySelector("span[id='namaproker']").innerHTML = document.querySelector("input[id='proker1']").value;
  document.querySelector("span[id='persen_proker']").innerHTML = persen_proker;

  // tabel kesimpulan evaluasi
  document.querySelector("td[id='sesuai_rencana']").innerHTML = roundAccurately((20/100)*persen_sesuai_rencana, 2);
  document.querySelector("td[id='sesuai_tujuansasaran']").innerHTML = roundAccurately((25/100)*persen_sesuai_tujuansasaran, 2);
  document.querySelector("td[id='sesuai_waktutempat']").innerHTML = roundAccurately((15/100)*(persen_sesuai_waktutempat[0] + persen_sesuai_waktutempat[1] + persen_sesuai_waktutempat[2]), 2);
  document.querySelector("td[id='sesuai_parameter']").innerHTML = roundAccurately((30/100)*persen_sesuai_parameter[0], 2);
  document.querySelector("td[id='efisiensi_dana']").innerHTML = roundAccurately((10/100)*persen_estimasi_dana, 2);

  document.querySelector("td[id='persen_proker']").innerHTML = persen_proker;
}
