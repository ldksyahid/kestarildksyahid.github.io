const roundAccurately = (number, decimalPlaces) => Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)

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
