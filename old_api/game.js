

// class game_t {
//     get_packets = () => {
//         return this.packets;
//     }

//     get_map_name = () => {
//         return this.arena.name;
//     }

//     get_game_mode = () => {
//         return this.game_mode;
//     }

//     get_arena = () => {
//         return this.arena;
//     }

//     get_team = (team_id) => {
//         return this.teams[team_id];
//     }

//     get_recorder_id = () => {
//         return this.recorder_id;
//     }

//     find_property = (clock, player_id, property, out) => {
//     // inline function function for using with stl to finding the range with the same clock
//     const has_same_clock = (target) => {
//         // packets without clock are included
//         return target.has_property(property_t.clock)
//             && target.clock() == clock;
//     };

//     // find first packet with same clock
//     const it_clock_begin = this.packets.find(has_same_clock);
//     // find last packet with same clock
//     const it_clock_end = this.packets.find_last_of(has_same_clock);

//     const is_related_with_property = (target) => {
//         return target.has_property(property_t.clock) &&
//             target.has_property(property_t.player_id) &&
//             target.has_property(property) &&
//             target.player_id() == player_id;
//     };

//     const it = this.packets.find_if(is_related_with_property);
//     const found = it != it_clock_end;

//     if (!found) {
//         const result_after = this.packets.find_if(has_same_clock, it_clock_end);
//         const it_clock_rbegin = this.packets.rbegin() + (this.packets.size() - (it_clock_begin - this.packets.begin()));
//         const result_before = this.packets.find_if(has_same_clock, it_clock_rbegin);

//         if (result_after != this.packets.end() && result_before != this.packets.rend()) {
//             // if both iterators point to items within the collection
//             const cmp_by_clock = (left, right) => left.clock() <= right.clock();
//             out = Math.min(* result_before, * result_after, cmp_by_clock);
//             found = true;
//         } else if (result_after == this.packets.end() && result_before != this.packets.rend()) {
//             // only result_before points to item in collection
//             out = * result_before;
//             found = true;
//         } else if (result_after != this.packets.end() && result_before == this.packets.rend()) {
//             // only result_after points to item in collection
//             out = * result_after;
//             found = true;
//         }
//     } else {
//         out = * it;
//     }

//     return found;
// },

// get_team_id: function(player_id) {
//     const it = this.teams.find((team) => team.find(player_id) != team.end());
//     return it == this.teams.end() ? -1 : (it - this.teams.begin());
// },

// get_version = () => {
//     return this.version;
// },

//     get_game_begin = () => {
//         return this.game_begin;
//     },

//     get_game_end = () => {
//         return this.game_end;
//     },

//     get_raw_replay = () => {
//         return this.replay;
//     },

//     write_parts_to_file: function(game) {
//         const game_begin = "game_begin.json";
//         const game_end = "game_end.json";
//         const replay_content = "replay.dat";

//         const game_begin_buffer = new Buffer(game.get_game_begin());
//         const game_end_buffer = new Buffer(game.get_game
//     }  

// }