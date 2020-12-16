
const UserRepository = module.require('UserRepository');
const userData = module.require('userData');
const User = module.require('User');
const repo = new UserRepository(userData);
const user = new User(repo.getUserData(getRandomNumber()));

const HydrationRepository = module.require('HydrationRepository');
const hydrationData = module.require('hydrationData');
const Hydration = module.require('Hydration');
const hydroRepo = new HydrationRepository(hydrationData);
const userHydro = new Hydration(hydroRepo.getUserData(user.id));

const SleepRepository = module.require('SleepRepository');
const sleepData = module.require('sleepDaya');
const Sleep = module.require('Sleep');
const sleepRepo = new SleepRepository(sleepData);
const sleepyPerson = new Sleep(sleepRepo.getUserData(user.id));

const ActivityRepository = module.require('ActivityRepository');
const activityData = module.require('activityData');
const Activity = module.require('Activity');
const activeRepo = new ActivityRepository(activityData);
const activePerson = new Activity(activeRepo.getUserData(user.id), user);

function milisecondsToDate(miliseconds) {
  return new Date(miliseconds).toString().slice(0, 10)
}

function getRandomNumber() {
  return Math.floor(Math.random() * userData.length)
}

const sampleDate = '2019/08/29'

$('.header__div-userName').text(`${user.getUserFirstName()}`);
$('.header__div__user-stepgoal').text(`${user.dailyStepGoal}`);
$('.header__div__allusers-stepgoal').text(`${repo.getAllUsersAvgStepGoal()}`);
$('.header__div__container__avg--steps').text(activeRepo.getAvgActivityStatsAllUsers(sampleDate, 'numSteps'));
$('.header__div__container__avg--sleep').text(sleepRepo.getAvgSleepStatsAllUsers(sleepRepo.data, 'hoursSlept'));
$('.header__div__container__avg--hydration').text(hydroRepo.getAvgAllUsers());
$('.hydration__container--consumed--today').text(`${userHydro.userHydrationByDate(sampleDate)}`);

userHydro.getHydroArray(sampleDate)

$('.hydration__container--consumed--this--week').text(`${userHydro.getWeeklyHydroAvg()}`);
$('.main__hydration__average--all-users').text(`${hydroRepo.getAvgAllUsers()}`)
$('.sleep__container--hours--today').text(`${sleepyPerson.getStatsFromDay(sampleDate, 'hoursSlept')}`);
$('.sleep__container--hours--this--week').text(`${sleepyPerson.getWeeklyAvg(sampleDate, 'hoursSlept')}`);
$('.sleep__container--quality--today').text(sleepyPerson.getStatsFromDay(sampleDate, 'sleepQuality'));
$('.sleep__container--quality--this--week ').text(sleepyPerson.getWeeklyAvg(sampleDate, 'sleepQuality'));

$('.sleep__container--hours--all--users').text(
  sleepRepo.getAvgSleepStatsAllUsers(sleepRepo.getWeekOfUsers(sampleDate), 'hoursSlept'))

$('.sleep__container--sleepQuality--all--users').text(
  sleepRepo.getAvgSleepStatsAllUsers(sleepRepo.getWeekOfUsers(sampleDate), 'sleepQuality'))

$('.activity__container--user--steps--today').text(`${activePerson.getStatsFromDay(sampleDate, 'numSteps')}`)
$('.activity__container--user--active--today').text(`${activePerson.getStatsFromDay(sampleDate, 'minutesActive')}`)
$('.activity__container--user--miles--today').text(`${activePerson.getMiles(sampleDate, 'numSteps')}`) 
$('.activity__container--user--flights--today').text(`${activePerson.getStatsFromDay(sampleDate, 'flightsOfStairs')}`) 

$('.activity__container--allusers--steps--today').text(`${activeRepo.getAvgActivityStatsAllUsers(sampleDate, 'numSteps')}`)
$('.activity__container--allusers--active--today').text(`${activeRepo.getAvgActivityStatsAllUsers(sampleDate, 'minutesActive')}`)
$('.activity__container--allusers--flights--today').text(`${activeRepo.getAvgActivityStatsAllUsers(sampleDate, 'flightsOfStairs')}`)


let weekOfDates = sleepyPerson.getWeek(sampleDate).map(day => milisecondsToDate(day.date));

const hydroChart = $('#hydroChart--thisWeek');

var myChart = new Chart(hydroChart, {
  type: 'bar',
  data: {
    labels: weekOfDates,
    datasets: [{
      label: 'Oz',
      data: userHydro.getHydroArray(sampleDate).map(day => day.numOunces),
      backgroundColor: [
        'rgba(0, 121, 223, 1)',
        'rgba(0, 121, 223, 1)',
        'rgba(0, 121, 223, 1)',
        'rgba(0, 121, 223, 1)',
        'rgba(0, 121, 223, 1)',
        'rgba(0, 121, 223, 1)',
        'rgba(0, 121, 223, 1)',
      ]
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
const sleepChart = $('#sleepChart--thisWeek');


var mixedChart = new Chart(sleepChart, {
  type: 'bar',
  data: {
    datasets: [{
      label: 'Hours Slept',
      data: sleepyPerson.getWeek(sampleDate).map(day => day.hoursSlept),
      backgroundColor: [

        'rgba(37, 36, 92, .8 )',
        'rgba(37, 36, 92, .8 )',
        'rgba(37, 36, 92, .8 )',
        'rgba(37, 36, 92, .8 )',
        'rgba(37, 36, 92, .8 )',
        'rgba(37, 36, 92, .8 )',
        'rgba(37, 36, 92, .8 )',
      ],
    }, {
      type: 'line',
      label: 'Sleep Quality',
      data: sleepyPerson.getWeek(sampleDate).map(day => day.sleepQuality),
      backgroundColor: [
        'rgba(61, 175, 9, .6)',
        'rgba(61, 175, 9, .6)',
        'rgba(61, 175, 9, .6)',
        'rgba(61, 175, 9, .6)',
        'rgba(61, 175, 9, .6)',
        'rgba(61, 175, 9, .6)',
        'rgba(61, 175, 9, .6)',
      ],
    }],
    labels: weekOfDates
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});


const activitySteps = $('#activitySteps--thisWeek')

var myChart = new Chart(activitySteps, {
  type: 'bar',
  data: {
    labels: weekOfDates,
    datasets: [{
      label: 'Steps',
      data: activePerson.getWeek(sampleDate).map( day => day.numSteps),

      backgroundColor: [
        'rgba(215, 4, 0, .8)',
        'rgba(215, 4, 0, .8)',
        'rgba(215, 4, 0, .8)',
        'rgba(215, 4, 0, .8)',
        'rgba(215, 4, 0, .8)',
        'rgba(215, 4, 0, .8)',
        'rgba(215, 4, 0, .8)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    
  }
});

const activityFlights = $('#activityFlights--thisWeek')

var myChart = new Chart(activityFlights, {
  type: 'line',
  data: {
    labels: weekOfDates,
    datasets: [{
      label: 'Flights of Stairs',
      data: activePerson.getWeek(sampleDate).map(day => day.flightsOfStairs),

      backgroundColor: [
        'rgba(61, 175, 9, .8)',
        'rgba(61, 175, 9, .8)',
        'rgba(61, 175, 9, .8)',
        'rgba(61, 175, 9, .8)',
        'rgba(61, 175, 9, .8)',
        'rgba(61, 175, 9, .8)',
        'rgba(61, 175, 9, .8)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

const activityMins = $('#activityMins--thisWeek')

var myChart = new Chart(activityMins, {
  type: 'line',
  data: {
    labels: weekOfDates,
    datasets: [{
      label: 'Minutes Active',
      data: activePerson.getWeek(sampleDate).map(day => day.minutesActive),
      backgroundColor: [
        'rgba(37, 36, 92, .85)',
        'rgba(37, 36, 92, .85)',
        'rgba(37, 36, 92, .85)',
        'rgba(37, 36, 92, .85)',
        'rgba(37, 36, 92, .85)',
        'rgba(37, 36, 92, .85)',
        'rgba(37, 36, 92, .85)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

const friends = user.friends.map(friend => {
  let newUser = new User(repo.getUserData(friend))
  let newFriend = new Activity(activeRepo.getUserData(friend), newUser).getWeek(sampleDate).reduce((newObj, day) => {
    if (!newObj['id']) {
      newObj['id'] = day.userID;
      newObj['name'] = newUser.name;
      newObj['steps'] = 0;
    } newObj['steps'] += day.numSteps
    return newObj
  }, {})
  return newFriend
})

const compareFriendsSteps = () => {
  friends.push({ id: user.id, name: user.name, steps: (activePerson.getWeeklyAvg(sampleDate, 'numSteps') * 7) });
  friends.sort((personA, personB) => {
    return personB.steps - personA.steps
  })
}

compareFriendsSteps();

const stepChallange = $('#step--challange')

var myChart = new Chart(stepChallange, {
  type: 'horizontalBar',
  data: {
    labels: friends.map(friend => friend.name),
    datasets: [{
      label: 'steps',
      data: friends.map(friend => friend.steps),
      backgroundColor: [
        'rgba(102, 149, 232, 1)',
        'rgba(102, 149, 232, 1)',
        'rgba(102, 149, 232, 1)',
        'rgba(102, 149, 232, 1)',
        'rgba(102, 149, 232, 1)',
        'rgba(102, 149, 232, 1)',
        'rgba(102, 149, 232, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

const threeDayStreak = $('#3--day--streak')

let streak = activePerson.returnIncreasedStepDays(sampleDate).splice(-3, 3).reverse()


function checkStreak() {
  if (!streak.length) {
    $('.main__trends--3--day--streak').hide()
    $('.main__trends--3--day--streak').after(`No recent Streaks. Keep walking!`)
  }
}

checkStreak();



var myChart = new Chart(threeDayStreak, {
  type: 'horizontalBar',
  data: {
    labels: streak.map(day => milisecondsToDate(day.date)), 
    datasets: [{
      label: 'steps',
      data: streak.map(day => day.numSteps),
      backgroundColor: [
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

$('.mile--high--number').text(activePerson.mileHighChallenge())

