'use server'

import { z } from 'zod'
import { CreateTaskSchema, UpdateTaskSchema, EditTaskSchema, DeleteTaskSchema } from '@repo/common-types'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTask(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    // Validate input
    const validatedData = CreateTaskSchema.parse({ title, description })

    // Get authenticated user
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: 'User not authenticated' }
    }

    // Insert task into database
    const { error } = await supabase
      .from('tasks')
      .insert([
        {
          title: validatedData.title,
          description: validatedData.description,
          user_id: user.id,
          is_completed: false,
        },
      ])

    if (error) {
      return { error: error.message }
    }

    // Revalidate the dashboard page to reflect changes
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Failed to create task' }
  }
}

export async function updateTask(id: string, is_completed: boolean) {
  try {
    // Validate input
    const validatedData = UpdateTaskSchema.parse({ id, is_completed })

    // Get authenticated user
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: 'User not authenticated' }
    }

    // Update task
    const { error } = await supabase
      .from('tasks')
      .update({ is_completed: validatedData.is_completed, updated_at: new Date().toISOString() })
      .eq('id', validatedData.id)
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message }
    }

    // Revalidate the dashboard page
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Failed to update task' }
  }
}

export async function editTask(id: string, title: string, description: string) {
  try {
    // Validate input
    const validatedData = EditTaskSchema.parse({ id, title, description })

    // Get authenticated user
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: 'User not authenticated' }
    }

    // Update task
    const { error } = await supabase
      .from('tasks')
      .update({
        title: validatedData.title,
        description: validatedData.description,
        updated_at: new Date().toISOString(),
      })
      .eq('id', validatedData.id)
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message }
    }

    // Revalidate the dashboard page
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Failed to edit task' }
  }
}

export async function deleteTask(id: string) {
  try {
    // Validate input
    const validatedData = DeleteTaskSchema.parse({ id })

    // Get authenticated user
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: 'User not authenticated' }
    }

    // Delete task
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', validatedData.id)
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message }
    }

    // Revalidate the dashboard page
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Failed to delete task' }
  }
}
