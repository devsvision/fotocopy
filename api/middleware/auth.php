<?php

declare(strict_types=1);

require_once __DIR__ . '/../core/bootstrap.php';

function current_user(): ?array
{
    return $_SESSION['user'] ?? null;
}

function require_auth(): array
{
    $user = current_user();
    if (!$user) {
        json_response(['success' => false, 'message' => 'Login diperlukan.'], 401);
    }

    return $user;
}

function require_roles(array $roles): array
{
    $user = require_auth();
    if (!in_array($user['role_code'], $roles, true)) {
        json_response(['success' => false, 'message' => 'Akses tidak diizinkan.'], 403);
    }

    return $user;
}

function can_access_store(array $user, int $storeId): bool
{
    if ($user['role_code'] === 'SUPER_ADMIN') {
        return true;
    }

    return (int) ($user['store_id'] ?? 0) === $storeId;
}
