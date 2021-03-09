function calculateAge(birthday, deathday) {
  var age;
  var ageDifMs;
  var ageDate;

  if (deathday) {
    ageDifMs = new Date(deathday).getTime() - new Date(birthday).getTime();
    ageDate = new Date(ageDifMs);

    age = Math.abs(ageDate.getUTCFullYear() - 1970);
  } else {
    ageDifMs = new Date() - new Date(birthday).getTime();
    ageDate = new Date(ageDifMs);

    age = Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return age;
}

function PersonInfo(d) {
  this.type = "person";
  this.id = d.id || "Unknown";
  this.img = "https://image.tmdb.org/t/p/w200" + d.img;
  this.name = d.name || "Unknown";
  this.birthday = d.birthday || "Unknown";
  this.placeOfBirth = d.placeOfBirth || "Unknown";
  this.deathday = d.deathday;

  this.knownFor = d.knownFor || "Unknown";
  
  if (d.characterList) {
    this.character = d.characterList.map(function(r){ return r.character; }).join(', '); 
  }
  
  if (d.character) {
    this.character = d.character; 
  }

  if (d.birthday) {
    this.age = calculateAge(d.birthday, d.deathday);
  } else {
    this.age = null;
  }
}
