const processor = (function() {
  let fitDefender = (i) => { return i.element_type === 2 && i.chance_of_playing_next_round === 100 && i.points_per_game >= 1};
  let fitDefenderCount = (ds) => {
    return ds.teams.map(i => { let players = source.elements.filter(k => k.team_code === i.code); let fd = players.filter(fitDefender); i.fdCount = fd.length; return i})
  };
  let pDataKeys = ["web_name", "points_per_game", "minutes", "chance_of_playing_next_round", "squad_number", "now_cost"];
  let getPlayers = (typeCheckFnc, ds) => {
  return ds.teams.map(i => {
      let r = {};
      r.name = i.name;
      r.players = source.elements.filter(k => k.team_code === i.code && fnc(k.element_type))
                              .sort((a,b) => -a.minutes + b.minutes)
                              .map(k => copyKeys(k,pDataKeys));
      return r;
    });
  };
  let bestPlayers = (filterFnc, ds) => {
    let r = {};
    return ds.elements.filter(i => filterFnc(i))
                             .map(k => copyKeys(k,pDataKeys))
                             .sort((a,b) => -a.minutes + b.minutes);
  };
  let copyKeys = (obj, keys) => {
    let r = {};
    for (let i = 0; i < keys.length; i++){
      r[keys[i]] = obj[keys[i]];
    }
    return r;
  };
  return {
    fitDefender : fitDefender,
    fitDefenderCount : fitDefenderCount,
    getPlayers : getPlayers,
    bestPlayers : bestPlayers
  };
}());
