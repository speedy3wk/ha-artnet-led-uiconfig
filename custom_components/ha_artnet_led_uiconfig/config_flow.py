from __future__ import annotations

import voluptuous as vol

from homeassistant import config_entries

from .const import DOMAIN


class HaArtnetLedUiConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input=None):
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        return self.async_create_entry(title="Art-Net LED UI Config", data={})

    async def async_step_import(self, user_input):
        return await self.async_step_user(user_input)
