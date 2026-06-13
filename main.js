import { world, system } from "@minecraft/server";

world.beforeEvents.chatSend.subscribe((eventData) => {
    const msg = eventData.message;
    const player = eventData.sender;

    if (msg.startsWith("!tpa")) {
        eventData.cancel = true;
        const args = msg.split(" ");
        
        if (args.length < 2) {
            player.sendMessage("§cUse: !tpa [NomeDoJogador]");
            return;
        }

        const targetName = args[1];
        const target = world.getAllPlayers().find(p => p.name === targetName);

        if (target) {
            system.run(() => {
                player.teleport(target.location, { dimension: target.dimension });
                world.sendMessage(`§a[TPA] Teletransportado para ${target.name}!`);
            });
        } else {
            player.sendMessage(`§cJogador não encontrado.`);
        }
    }
});
