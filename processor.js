const processor = (function() {
  let fitDefender = (i) => { return i.element_type === 2 && i.chance_of_playing_next_round === 100 && i.points_per_game >= 1};
  let fitDefenderCount = (ds) => {
    return ds.teams.map(i => { let players = source.elements.filter(k => k.team_code === i.code); let fd = players.filter(fitDefender); i.fdCount = fd.length; return i})
  };
  let getPlayers = (type, ds) => {
  return ds.teams.map(i => {
      let r = {};
      r.name = i.name;
      r.defs = source.elements.filter(k => k.team_code === i.code && k.element_type === type)
                              .sort((a,b) => -a.minutes + b.minutes)
                              .map(k => {let d = {};
                                          d.name = k.web_name;
                                          d.ppg = k.points_per_game;
                                          d.minutes = k.minutes
                                          d.chance = k.chance_of_playing_next_round;
                                          d.number = k.squad_number;
                                          d.cost = k.now_cost;
                                          return d});
      return r;
    });
  };
  return {
    fitDefender : fitDefender,
    fitDefenderCount : fitDefenderCount,
    getPlayers : getPlayers
  };
}());
