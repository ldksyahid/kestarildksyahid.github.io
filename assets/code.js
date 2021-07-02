const roundAccurately = (number, decimalPlaces) => Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
const average = arr => arr.reduce((acc,v) => acc + v) / arr.length;

var bahan_hitung = {
  "namaproker" : "",
  "aspek_nilai" : {
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
      "tempat" : {"opsi" : 0, "persen" : 0}
    },

    "sesuai_parameter" : {
      "parameter" : [{"realisasi" : 0, "estimasi" : 0, "satuan" : ""}]
    },

    "efisiensi_dana" : {
      "estimasi_dana" : 0,
      "realisasi_dana" : 0,
      "skala_penurunan" : 4
    }
  },
  "total_persentase" : 0
}

function hitung_sesuai_rencana(){
  var rencana = bahan_hitung["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"];
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

function hitung_sesuai_tujuan(){
  var tujuan = bahan_hitung["aspek_nilai"]["sesuai_tujuansasaran"]["tujuan"];
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

function hitung_sesuai_sasaran(){
  var sasaran = bahan_hitung["aspek_nilai"]["sesuai_tujuansasaran"]["sasaran"];
  count = 0;
  sasaran.forEach((item, i) => {
    if(item["terlaksana"]){
      count += 1;
    }
  });

  jumlah_terlaksana = count;
  jumlah_sasaran = sasaran.length;

  hasil = jumlah_terlaksana/jumlah_sasaran;
  return roundAccurately(hasil*100, 2);
}

function hitung_sesuai_waktutempat(){
  var tanggal = bahan_hitung["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["tanggal"]["persen"];
  var jam = bahan_hitung["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["jam"]["persen"];
  var tempat = bahan_hitung["aspek_nilai"]["sesuai_waktutempat"]["tempat"]["persen"];

  tanggal = parseFloat(tanggal);
  jam = parseFloat(jam);
  tempat = parseFloat(tempat);

  return [tanggal, jam, tempat];
}

function hitung_sesuai_parameter(){
  var rencana = bahan_hitung["aspek_nilai"]["sesuai_parameter"]["parameter"];
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

function hitung_estimasi_dana(esti, real, scale){
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

function tambah_deskripsi(){
  // get parent node first
  var parent = document.querySelector("div.rencana div.unsur");
  var blueprint_element = parent.lastElementChild;

  // find the number of latest node and json
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(blueprint_element.id)[1];
  number = parseFloat(number) + 1;

  var deskripsi = bahan_hitung["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"]
  deskripsi.push({"deskripsi" : "", "terlaksana" : false});

  // create new duplicated node
  var new_element = document.createElement("div")
  new_element.setAttribute("id", "deskripsi_" + (number));
  new_element.innerHTML = blueprint_element.innerHTML;

  // append new node to parent
  parent.appendChild(new_element);
  // console.log(deskripsi);
  // console.log(number);
  // console.log(new_element);
}

function kurang_deskripsi(){
  // get parent node first
  var parent = document.querySelector("div.rencana div.unsur");
  var to_remove = parent.lastElementChild;

  // find the latest number of node
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(to_remove.id)[1];

  // to prevent of losing last node
  if (number == 1){
    return console.log("Cannot remove this node, this is the last node!");
  }

  // remove node and json element
  var deskripsi = bahan_hitung["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"]
  deskripsi.pop();

  to_remove.remove();
}

function tambah_tujuan(){
  // get parent node first
  var parent = document.querySelector("div.tujuansasaran div.tujuan");
  var blueprint_element = parent.lastElementChild;

  // find the number of latest node and json
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(blueprint_element.id)[1];
  number = parseFloat(number) + 1;

  var tujuan = bahan_hitung["aspek_nilai"]["sesuai_tujuansasaran"]["tujuan"]
  tujuan.push({"deskripsi" : "", "terlaksana" : false});

  // create new duplicated node
  var new_element = document.createElement("div")
  new_element.setAttribute("id", "tujuan_" + (number));
  new_element.innerHTML = blueprint_element.innerHTML;

  // append new node to parent
  parent.appendChild(new_element);
  // console.log(tujuan);
  // console.log(number);
  // console.log(new_element);
}

function kurang_tujuan(){
  // get parent node first
  var parent = document.querySelector("div.tujuansasaran div.tujuan");
  var to_remove = parent.lastElementChild;

  // find the latest number of node
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(to_remove.id)[1];

  // to prevent of losing last node
  if (number == 1){
    return console.log("Cannot remove this node, this is the last node!");
  }

  // remove node and json element
  var tujuan = bahan_hitung["aspek_nilai"]["sesuai_tujuansasaran"]["tujuan"]
  tujuan.pop();

  to_remove.remove();
}

function tambah_sasaran(){
  // get parent node first
  var parent = document.querySelector("div.tujuansasaran div.sasaran");
  var blueprint_element = parent.lastElementChild;

  // find the number of latest node and json
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(blueprint_element.id)[1];
  number = parseFloat(number) + 1;

  var sasaran = bahan_hitung["aspek_nilai"]["sesuai_tujuansasaran"]["sasaran"]
  sasaran.push({"deskripsi" : "", "terlaksana" : false});

  // create new duplicated node
  var new_element = document.createElement("div")
  new_element.setAttribute("id", "sasaran_" + (number));
  new_element.innerHTML = blueprint_element.innerHTML;

  // append new node to parent
  parent.appendChild(new_element);
  // console.log(sasaran);
  // console.log(number);
  // console.log(new_element);
}

function kurang_sasaran(){
  // get parent node first
  var parent = document.querySelector("div.tujuansasaran div.sasaran");
  var to_remove = parent.lastElementChild;

  // find the latest number of node
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(to_remove.id)[1];

  // to prevent of losing last node
  if (number == 1){
    return console.log("Cannot remove this node, this is the last node!");
  }

  // remove node and json element
  var sasaran = bahan_hitung["aspek_nilai"]["sesuai_tujuansasaran"]["sasaran"]
  sasaran.pop();

  to_remove.remove();
}

function tambah_parameter(){
  // get parent node first
  var parent = document.querySelector("div.parameter div.unsur");
  var blueprint_element = parent.lastElementChild;

  // find the number of latest node and json
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(blueprint_element.id)[1];
  number = parseFloat(number) + 1;

  var parameter = bahan_hitung["aspek_nilai"]["sesuai_parameter"]["parameter"]
  parameter.push({"realisasi" : 0, "estimasi" : 0, "satuan" : ""});

  // create new duplicated node
  var new_element = document.createElement("div");
  new_element.setAttribute("id", "parameter_" + (number));
  new_element.innerHTML = blueprint_element.innerHTML;

  // append new node to parent
  parent.appendChild(new_element);
  // console.log(deskripsi);
  // console.log(number);
  // console.log(new_element);
}

function kurang_parameter(){
  // get parent node first
  var parent = document.querySelector("div.parameter div.unsur");
  var to_remove = parent.lastElementChild;

  // find the latest number of node
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(to_remove.id)[1];

  // to prevent of losing last node
  if (number == 1){
    return console.log("Cannot remove this node, this is the last node!");
  }

  // remove node and json element
  var parameter = bahan_hitung["aspek_nilai"]["sesuai_parameter"]["parameter"]
  parameter.pop();

  to_remove.remove();
}

function refreshValue(){
  bahan_hitung["namaproker"] = document.getElementById('proker1').value;

  // 1. Kesesuaian Rencana
  var parent = bahan_hitung["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"];
  parent.forEach((item, i) => {
    item["deskripsi"] = document.querySelector("#deskripsi_" + parseFloat(i+1) + " input[type='text']").value;
    item["terlaksana"] = document.querySelector("#deskripsi_" + parseFloat(i+1) + " input[type='checkbox']").checked;
  });

  // 2. Kesesuaian Tujuan dan Sasaran
  var parent = bahan_hitung["aspek_nilai"]["sesuai_tujuansasaran"]["tujuan"];
  parent.forEach((item, i) => {
    item["deskripsi"] = document.querySelector("#tujuan_" + parseFloat(i+1) + " input[type='text']").value;
    item["terlaksana"] = document.querySelector("#tujuan_" + parseFloat(i+1) + " input[type='checkbox']").checked;
  });

  var parent = bahan_hitung["aspek_nilai"]["sesuai_tujuansasaran"]["sasaran"];
  parent.forEach((item, i) => {
    item["deskripsi"] = document.querySelector("#sasaran_" + parseFloat(i+1) + " input[type='text']").value;
    item["terlaksana"] = document.querySelector("#sasaran_" + parseFloat(i+1) + " input[type='checkbox']").checked;
  });

  // parent.forEach((item, i) => {
  //   item["deskripsi"] = document.querySelector("#sasaran_" + parseFloat(i+1) + " input[type='text']").value;
  //   item["terlaksana"] = document.querySelector("#sasaran_" + parseFloat(i+1) + " input[type='checkbox']").checked;
  //
  //   console.log(item);

  // 3. Kesesuaian Waktu dan Tempat
  var parent = bahan_hitung["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["tanggal"];
  var radios = document.getElementsByName('tanggal');

  radios.forEach((item, i) => {
    if (item.checked){
      parent["opsi"] = item.id;
      parent["persen"] = item.value;
    }
  });

  var parent = bahan_hitung["aspek_nilai"]["sesuai_waktutempat"]["waktu"]["jam"];
  var radios = document.getElementsByName('jam');

  radios.forEach((item, i) => {
    if (item.checked){
      parent["opsi"] = item.id;
      parent["persen"] = item.value;
    }
  });

  var parent = bahan_hitung["aspek_nilai"]["sesuai_waktutempat"]["tempat"];
  var radios = document.getElementsByName('tempat');

  radios.forEach((item, i) => {
    if (item.checked){
      parent["opsi"] = item.id;
      parent["persen"] = item.value;
    }
  });

  // 4. Kesesuaian Parameter Keberhasilan
  var parent = bahan_hitung["aspek_nilai"]["sesuai_parameter"]["parameter"];
  parent.forEach((item, i) => {
    item["realisasi"] = document.querySelector("#parameter_" + parseFloat(i+1) + " input[id='realisasi_parameter']").value;
    item["estimasi"] = document.querySelector("#parameter_" + parseFloat(i+1) + " input[id='estimasi_parameter']").value;
    item["satuan"] = document.querySelector("#parameter_" + parseFloat(i+1) + " input[type='text']").value;
  });

  // 5. Efisiensi Dana
  // var persen_estimasi_dana = bahan_hitung["aspek_nilai"]["efisiensi_dana"]["persentase"];
  var esti = parseFloat(document.getElementById("estimasi_dana").value);
  var real = parseFloat(document.getElementById("realisasi_dana").value);
  var scale = parseFloat(document.getElementById("skala_penurunan").placeholder);

  var efisiensi_dana = bahan_hitung["aspek_nilai"]["efisiensi_dana"];

  efisiensi_dana["estimasi_dana"] = document.querySelector("div.efisiensi_dana input[id='estimasi_dana']").value;
  efisiensi_dana["realisasi_dana"] = document.querySelector("div.efisiensi_dana input[id='realisasi_dana']").value;
  efisiensi_dana["skala_penurunan"] = document.querySelector("div.efisiensi_dana input[id='skala_penurunan']").placeholder;

  // Rekap semua total_persentase
  // 1.
  var persen_sesuai_rencana = hitung_sesuai_rencana();
  document.querySelector("span[id='sesuai_rencana']").innerHTML = persen_sesuai_rencana;

  // 2a.
  var persen_sesuai_tujuan = hitung_sesuai_tujuan();
  document.querySelector("span[id='sesuai_tujuan']").innerHTML = persen_sesuai_tujuan/2;

  // 2b.
  var persen_sesuai_sasaran = hitung_sesuai_sasaran();
  document.querySelector("span[id='sesuai_sasaran']").innerHTML = persen_sesuai_sasaran/2;

  // 2.
  var persen_sesuai_tujuansasaran = (persen_sesuai_tujuan + persen_sesuai_sasaran) / 2;
  document.querySelector("span[id='sesuai_tujuansasaran']").innerHTML = roundAccurately(persen_sesuai_tujuansasaran, 2);

  // 3.
  var persen_sesuai_waktutempat = hitung_sesuai_waktutempat();
  document.querySelector("span[id='sesuai_waktutempat']").innerHTML = persen_sesuai_waktutempat[0] + persen_sesuai_waktutempat[1] + persen_sesuai_waktutempat[2];
  document.querySelector("span[id='sesuai_waktu']").innerHTML = persen_sesuai_waktutempat[0] + persen_sesuai_waktutempat[1];
  document.querySelector("span[id='sesuai_tanggal']").innerHTML = persen_sesuai_waktutempat[0];
  document.querySelector("span[id='sesuai_jam']").innerHTML = persen_sesuai_waktutempat[1];
  document.querySelector("span[id='sesuai_tempat']").innerHTML = persen_sesuai_waktutempat[2];
  // 4.
  var persen_sesuai_parameter = hitung_sesuai_parameter();
  if (isNaN(persen_sesuai_parameter[0]) == true){
    persen_sesuai_parameter[0] = 0;
  }

  document.querySelector("span[id='sesuai_parameter']").innerHTML = persen_sesuai_parameter[0];

  var parameters = document.querySelectorAll('[id^=parameter_] span');
  parameters.forEach((item, i) => {
    item.innerHTML = persen_sesuai_parameter[1][i];
  });

  // 5.
  var persen_estimasi_dana = hitung_estimasi_dana(esti, real, scale);
  document.querySelector("span[id='efisiensi_dana']").innerHTML = persen_estimasi_dana;

  // final per proker
  var persen_proker = ((20/100)*(persen_sesuai_rencana) +
                      (25/100)*(persen_sesuai_tujuansasaran) +
                      (15/100)*(persen_sesuai_waktutempat[0] + persen_sesuai_waktutempat[1] + persen_sesuai_waktutempat[2]) +
                      (30/100)*(persen_sesuai_parameter[0]) +
                      (10/100)*(persen_estimasi_dana));

  roundAccurately(persen_proker, 2);

  document.querySelector("span[id='persen_proker']").innerHTML = persen_proker;
  console.log(bahan_hitung);
}
