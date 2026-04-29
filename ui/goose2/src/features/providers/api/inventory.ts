import type {
  ProviderInventoryEntryDto,
  RefreshProviderInventoryResponse,
} from "@aaif/goose-sdk";
import { getClient } from "@/shared/api/acpConnection";
import { perfLog } from "@/shared/lib/perfLog";

export async function getProviderInventory(
  providerIds: string[] = [],
): Promise<ProviderInventoryEntryDto[]> {
  const client = await getClient();
  const t0 = performance.now();
  const response = await client.goose.GooseProvidersList({ providerIds });
  perfLog(
    `[perf:inventory] getProviderInventory done in ${(performance.now() - t0).toFixed(1)}ms (n=${response.entries.length})`,
  );
  return response.entries;
}

export async function refreshProviderInventory(
  providerIds: string[] = [],
): Promise<RefreshProviderInventoryResponse> {
  const client = await getClient();
  const t0 = performance.now();
  const response = await client.goose.GooseProvidersInventoryRefresh({
    providerIds,
  });
  perfLog(
    `[perf:inventory] refreshProviderInventory done in ${(performance.now() - t0).toFixed(1)}ms started=[${response.started.join(",")}]`,
  );
  return response;
}

const POLL_DELAYS_MS = [250, 500, 750, 1000, 1500, 2000];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/**
 * Refresh configured provider inventories in the background, polling until
 * all providers finish refreshing. Does NOT set the store's `loading` flag,
 * so the UI keeps showing cached data during the refresh.
 */
export async function backgroundRefreshInventory(
  inventoryStore: {
    mergeEntries: (entries: ProviderInventoryEntryDto[]) => void;
  },
  initialEntries?: ProviderInventoryEntryDto[],
): Promise<void> {
  const entries =
    initialEntries && initialEntries.length > 0
      ? initialEntries
      : await getProviderInventory();

  const configuredProviderIds = entries
    .filter((entry) => entry.configured)
    .map((entry) => entry.providerId);
  if (configuredProviderIds.length === 0) return;

  const refresh = await refreshProviderInventory(configuredProviderIds);
  if (refresh.started.length === 0) return;

  inventoryStore.mergeEntries(await getProviderInventory(refresh.started));

  for (const delayMs of POLL_DELAYS_MS) {
    await sleep(delayMs);
    const refreshedEntries = await getProviderInventory(refresh.started);
    inventoryStore.mergeEntries(refreshedEntries);
    if (refreshedEntries.every((entry) => !entry.refreshing)) return;
  }
}
