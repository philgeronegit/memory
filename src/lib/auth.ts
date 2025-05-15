const ROLES = {
  admin: [
    "view:users",
    "create:users",
    "update:users",
    "delete:users",
    "view:roles",
    "create:roles",
    "update:roles",
    "delete:roles",
    "view:permissions",
    "create:permissions",
    "update:permissions",
    "delete:permissions"
  ],
  developer: [
    "view:users",
    "view:comments",
    "create:comments",
    "update:ownComments",
    "delete:ownComments",
    "view:notes",
    "create:notes",
    "update:ownNotes",
    "delete:ownNotes",
    "view:tags",
    "create:tags",
    "update:tags",
    "view:noteTags",
    "create:noteTags",
    "update:noteTags",
    "delete:noteTags"
  ],
  leadDeveloper: [
    "view:users",
    "view:comments",
    "create:comments",
    "update:ownComments",
    "view:notes",
    "create:notes",
    "update:ownNotes",
    "delete:ownNotes"
  ],
  projectManager: [
    "view:users",
    "view:tasks",
    "create:tasks",
    "update:tasks",
    "delete:tasks",
    "view:projects",
    "create:projects",
    "update:projects",
    "delete:projects"
  ],
  external: ["view:comments", "create:comments", "update:comments"]
} as const;

export type Role = keyof typeof ROLES;
export type Roles = typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export type RoleUser = {
  id: number;
  role: Role;
};

export function hasPermission(
  user: RoleUser | undefined,
  permission: Permission
): boolean {
  if (!user) return false;
  return (ROLES[user.role] as readonly Permission[])?.includes(permission);
}
