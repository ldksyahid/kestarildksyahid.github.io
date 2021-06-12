const roundAccurately = (number, decimalPlaces) => Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
var bahan_hitung = {
  "namaproker" : "",
  "aspek_nilai" : {
    "sesuai_rencana" : {
      "deskripsi_program" : [{"deskripsi" : "", "terlaksana" : "off"}],
      "persentase" : 0
    },

    "sesuai_tujuansasaran" : {
      "jumlah_tujuan" : 1,
      "tujuan" : [{"deskripsi" : "", "terlaksana" : "off"}],
      "jumlah_sasaran" : 1,
      "sasaran" : [{"deskripsi" : "", "terlaksana" : "off"}],
      "persentase" : 0
    },

    "sesuai_waktutempat" : {
      "waktu" : {"opsi" : 0, "keterangan" : ""},
      "tempat" : {"opsi" : 0, "keterangan" : ""},
      "persentase" : 0
    },

    "sesuai_parameter" : {
      "parameter" : [{"realisasi" : 0, "estimasi" : 0, "satuan" : ""}],
      "persentase" : 0
    },

    "efisiensi_dana" : {
      "estimasi_dana" : 0,
      "realisasi_dana" : 0,
      "skala_penurunan" : 4,
      "persentase" : 0
    }
  },
  "total_persentase" : 0
}


function countEstimation(){
  esti = document.getElementById("estimation").value;
  real = document.getElementById("realization").value;
  scale = document.getElementById("scale").placeholder;

  esti = parseFloat(esti);
  real = parseFloat(real);
  scale = parseFloat(scale);

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
  console.log(result);
  document.getElementById("efficiency").value = roundAccurately(result*100, 2);
}

function tambah_deskripsi(){
  // get parent node first
  var parent = document.querySelector("div.rencana div.unsur");
  var blueprint_element = parent.lastElementChild;

  // find the number of latest node and json
  var myRegexp = /_(.*)/;
  number = myRegexp.exec(blueprint_element.id)[1];
  number = parseFloat(number) + 1;

  var total_deskripsi = bahan_hitung["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"].length;
  var deskripsi = bahan_hitung["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"]
  deskripsi.push({"deskripsi" : "", "terlaksana" : "off"});

  // create new duplicated node
  var new_element = document.createElement("div")
  new_element.setAttribute("id", "deskripsi_" + (number));
  new_element.innerHTML = blueprint_element.innerHTML;

  // append new node to parent
  parent.appendChild(new_element);
  console.log(deskripsi);
  console.log(number);
  console.log(new_element);
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

function refreshValue(){
  bahan_hitung["namaproker"] = document.getElementById('proker1').value;
  // 1. Kesesuaian Rencana
  // bahan_hitung["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"][0]["deskripsi"] = document.querySelector("div.rencana div input[type='text']").value;
  // bahan_hitung["aspek_nilai"]["sesuai_rencana"]["deskripsi_program"][0]["terlaksana"] = document.querySelector("div.rencana div input[type='checkbox']").value;
  // bahan_hitung["aspek_nilai"]["sesuai_rencana"]["persentase"] = ;

  // 2. Kesesuaian Tujuan dan Sasaran


  // 3. Kesesuaian Waktu dan Tempat

  // 4. Kesesuaian Parameter Keberhasilan

  // 5. Efisiensi Dana

  // console.log(bahan_hitung["namaproker"]);
  // console.log(a);
  console.log(bahan_hitung);
}
