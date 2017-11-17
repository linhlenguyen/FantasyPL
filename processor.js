const p = (function() {
  let fitDefender = (i) => { return i.element_type === 2 && i.chance_of_playing_next_round === 100 && i.points_per_game >= 1};
  let fitDefenderCount = (ds) => {
    return ds.teams.map(i => { let players = ds.elements.filter(k => k.team_code === i.code); let fd = players.filter(fitDefender); i.fdCount = fd.length; return i})
  };
  let pDataKeys = ["web_name", "points_per_game", "minutes", "chance_of_playing_next_round", "squad_number", "now_cost", "assists", "goals_scored", "clean_sheets"];
  let kMap = {
	  "web_name" : "name",
	  "points_per_game" : "ppg",
	  "chance_of_playing_next_round" : "chance",
	  "squad_number" : "no",
	  "now_cost" : "value",
	  "assists" : "A",
	  "goals_scored" : "G",
	  "clean_sheets" : "CS"
  };
  let getPlayers = (filterFnc, ds, cmp) => {
  return ds.teams.map(i => {
      let r = {};
      r.name = i.name;
      r.players = ds.elements.filter(k => k.team_code === i.code && filterFnc(k))
                              .sort(cmp)
                              .map(k => copyKeys(k,pDataKeys));
      return r;
    });
  };
  let bestPlayers = (filterFnc, ds, comp) => {
    let r = {};
    return ds.elements.filter(i => filterFnc(i))
                             .map(k => copyKeys(k,pDataKeys))
                             .sort(comp);
  };
  let copyKeys = (obj, keys) => {
    let r = {};
    for (let i = 0; i < keys.length; i++){
	let k = keys[i];
	if (kMap[keys[i]])
		k = kMap[keys[i]]
	r[k] = obj[keys[i]];
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
