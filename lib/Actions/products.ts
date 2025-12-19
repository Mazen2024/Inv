"use server"
import z from "zod";
import { getCurrentUser } from "../Auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";


/// Handling Delete Product Function
export async function deleteProduct(formdata: FormData) {

    const user = await getCurrentUser();

    /// Extract The Value Of Input In Delete Form 

    let delid = String(formdata.get('delid') || '')

    try {
        await prisma.products.deleteMany({
            where: {
                id: delid,
                userId: user.id
            }
        });
    }
    catch (e) {
        console.log(e);
    }
}

//// Schema Validation With Fields

const productSchema = z.object({
    name: z.string().min(1, "Name is Required"),
    price: z.coerce.number().nonnegative("Price Must Be NonNegative"),
    quantity: z.coerce.number().int().min(0, "Quantity Must Be NonNegative"),
    sku: z.string().optional(),
    lowStockAt: z.coerce.number().int().min(0).optional()
})


/// Handling Create Product Function
export async function createProduct(formdata: FormData) {

    /// Get Info About Current User
    const user = await getCurrentUser();

    /// Parse Inputs From Form 
    const parsedProduct = productSchema.safeParse({
        name: formdata.get('name'),
        price: formdata.get('price'),
        quantity: formdata.get('quantity'),
        sku: formdata.get('sku') || undefined,
        lowStockAt: formdata.get('lowstockat') || undefined,
    })

    if (!parsedProduct.success) {
        throw new Error('Validation Failed')
    }

    try {
        /// Create Method For Product Item With Current User ID
        await prisma.products.create({
            data: {
                ...parsedProduct.data, userId: user.id
            },
        })
    }

    catch (error) {
        throw new Error('Failed To Create Product')
    }
    redirect('/inventory');
}


// let arr : [number, number, number, string, boolean] = [1,2,3,'str', true]
