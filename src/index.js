function component() {
  let element = document.createElement('div');

  element.innerHTML = ['Hello', 'parcel'].join(' ');

  return element;
}

document.body.appendChild(component());
