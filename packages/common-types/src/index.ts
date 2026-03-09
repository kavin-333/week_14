import { z } from 'zod'

// ─── Task Type ───────────────────────────────────────────────

export type Task = {
    id: string
    title: string
    description?: string
    is_completed: boolean
    user_id: string
    created_at: string
    updated_at: string
}

// ─── Zod Schemas ─────────────────────────────────────────────

export const CreateTaskSchema = z.object({
    title: z
        .string()
        .min(1, 'Task title cannot be empty')
        .max(255, 'Task title must be less than 255 characters'),
    description: z.string().default(''),
})

export const UpdateTaskSchema = z.object({
    id: z.string().uuid('Invalid task ID'),
    is_completed: z.boolean(),
})

export const EditTaskSchema = z.object({
    id: z.string().uuid('Invalid task ID'),
    title: z
        .string()
        .min(1, 'Task title cannot be empty')
        .max(255, 'Task title must be less than 255 characters'),
    description: z.string().default(''),
})

export const DeleteTaskSchema = z.object({
    id: z.string().uuid('Invalid task ID'),
})
