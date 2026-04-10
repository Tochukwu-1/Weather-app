const date = new Date();
console.log(date)

function handleDay(date) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(date));
  }
 console.log(handleDay(date))
