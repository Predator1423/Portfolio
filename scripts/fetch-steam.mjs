// Steam Web API에서 소유 게임 / 최근 플레이 / 현재 상태를 가져와 steam-data.json으로 저장합니다.
// 실행에 필요한 값: 환경변수 STEAM_API_KEY, STEAM_ID (SteamID64)

const API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_ID;

if (!API_KEY || !STEAM_ID) {
  console.error("STEAM_API_KEY / STEAM_ID 환경변수가 없습니다.");
  process.exit(1);
}

const base = "https://api.steampowered.com";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`요청 실패 (${res.status}): ${url}`);
  return res.json();
}

async function main() {
  const ownedUrl = `${base}/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${STEAM_ID}&include_played_free_games=1&include_appinfo=1&format=json`;
  const recentUrl = `${base}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${STEAM_ID}&format=json`;
  const summaryUrl = `${base}/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${STEAM_ID}&format=json`;

  const [ownedRes, recentRes, summaryRes] = await Promise.all([
    getJson(ownedUrl),
    getJson(recentUrl),
    getJson(summaryUrl),
  ]);

  const ownedGames = ownedRes?.response?.games ?? [];
  const recentGames = recentRes?.response?.games ?? [];
  const player = summaryRes?.response?.players?.[0] ?? null;

  if (ownedRes?.response && ownedGames.length === 0 && ownedRes.response.game_count === undefined) {
    console.warn("소유 게임 목록이 비어있습니다. 스팀 프로필/게임 세부정보가 '공개'로 설정되어 있는지 확인하세요.");
  }

  const totalMinutes = ownedGames.reduce((sum, g) => sum + (g.playtime_forever || 0), 0);

  const topGames = [...ownedGames]
    .sort((a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0))
    .slice(0, 8)
    .map((g) => ({
      appid: g.appid,
      name: g.name,
      hours_total: Math.round((g.playtime_forever || 0) / 60 * 10) / 10,
      icon: g.img_icon_url
        ? `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`
        : null,
    }));

  const recent = recentGames.map((g) => ({
    appid: g.appid,
    name: g.name,
    hours_2weeks: Math.round((g.playtime_2weeks || 0) / 60 * 10) / 10,
    hours_total: Math.round((g.playtime_forever || 0) / 60 * 10) / 10,
    icon: g.img_icon_url
      ? `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`
      : null,
  }));

  const currentlyPlaying =
    player && player.gameextrainfo ? { name: player.gameextrainfo, appid: player.gameid } : null;

  const data = {
    updated_at: new Date().toISOString(),
    profile_public: ownedGames.length > 0 || !!player,
    total_games: ownedGames.length,
    total_hours: Math.round((totalMinutes / 60) * 10) / 10,
    currently_playing: currentlyPlaying,
    persona_state: player ? player.personastate : null,
    top_games: topGames,
    recent_games: recent,
  };

  const fs = await import("node:fs/promises");
  await fs.writeFile("steam-data.json", JSON.stringify(data, null, 2));
  console.log(`steam-data.json 저장 완료 (게임 ${data.total_games}개, 총 ${data.total_hours}시간)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
